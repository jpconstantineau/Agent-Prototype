import { TodoStore } from './store.js';
import { ToolRegistry, registerWebMCP } from './tools.js';
import { AgentLoop, modelAvailability, responseSchema, systemPrompt } from './agent.js';
import { SessionManager } from './session-manager.js';
import { RuntimeStore } from './runtime-store.js';
import { ProviderProfileStore } from './provider-profile-store.js';
import { ModelSettingsView } from './model-settings-view.js';
import { UserInputBroker } from './user-input-broker.js';
import { UserInputView } from './user-input-view.js';
import { createChatExecutor } from './chat-executor.js';
import { ToolPolicy, abortError } from './runtime.js';

const $ = selector => document.querySelector(selector);
let store, registry, connection, session, agent, controller;
let filter = 'all', offset = 0, nextOffset = null, editingId = null;
let refreshId = 0, toastTimer, running = false, initializing = false;
let aiSupported = false;
let runtime, identity, modelSettings, broker, questionView, chatExecutor, lastRunId, activeRunId;
const policy = new ToolPolicy();
let threadId = crypto.randomUUID();
const pageSize = 25;
const taskList = $('#task-list');
const chatInput = $('#chat-input');
const messages = $('#messages');
const dialog = $('#item-dialog');

$('#today').textContent = new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' });

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function toast(text) {
  clearTimeout(toastTimer);
  $('#toast').textContent = text;
  $('#toast').hidden = false;
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 4500);
}

function showEmpty(title, description, action) {
  const empty = element('div', 'empty');
  empty.append(element('h3', '', title), element('p', '', description));
  if (action) {
    const button = element('button', 'text-button', action.label);
    button.addEventListener('click', action.run);
    empty.append(button);
  }
  taskList.append(empty);
}

function renderItem(item) {
  const row = element('article', `task-row${item.completed ? ' completed' : ''}`);
  row.dataset.id = item.id;
  const check = element('input', 'task-check');
  check.type = 'checkbox';
  check.checked = item.completed;
  check.setAttribute('aria-label', `${item.completed ? 'Reopen' : 'Complete'} ${item.title}`);
  check.addEventListener('change', async () => {
    check.disabled = true;
    try {
      const result = await registry.execute('complete_item', { id: item.id, completed: check.checked }, { actor: 'human' });
      if (!result.success) { toast(result.error); check.checked = item.completed; }
    } catch { toast('Could not confirm this change. Review saved tasks before retrying.'); check.checked = item.completed; }
    finally { check.disabled = false; }
  });
  const body = element('div', 'task-body');
  body.append(element('div', 'task-title', item.title));
  if (item.notes) body.append(element('div', 'task-notes', item.notes));
  const meta = element('div', 'task-meta');
  if (item.priority !== 'normal') meta.append(element('span', `priority ${item.priority}`, `${item.priority[0].toUpperCase()}${item.priority.slice(1)} priority`));
  if (item.dueDate) {
    const date = new Date(`${item.dueDate}T00:00:00`);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const overdue = !item.completed && date < today;
    meta.append(element('span', `due${overdue ? ' overdue' : ''}`, `${overdue ? 'Overdue · ' : ''}${date.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}`));
  }
  if (meta.childElementCount) body.append(meta);
  const edit = element('button', 'icon-button edit-item', 'Edit');
  edit.setAttribute('aria-label', `Edit ${item.title}`);
  edit.title = 'Edit task';
  edit.addEventListener('click', () => openEditor(item));
  row.append(check, body, edit);
  return row;
}

async function refresh() {
  if (!store) return;
  const requestId = ++refreshId;
  try {
    const [page, all, open] = await Promise.all([
      store.list({ query: $('#search').value, status: filter, offset, limit: pageSize }),
      store.list({ limit: 1 }), store.list({ status: 'open', limit: 1 }),
    ]);
    if (requestId !== refreshId) return;
    if (page.total && !page.items.length && offset) { offset = 0; return refresh(); }
    taskList.replaceChildren();
    for (const item of page.items) taskList.append(renderItem(item));
    if (!page.items.length) {
      const hasQuery = $('#search').value.trim();
      const action = hasQuery
        ? { label: 'Clear search', run: () => { $('#search').value = ''; offset = 0; refresh(); $('#search').focus(); } }
        : all.total && filter !== 'all' ? { label: 'View all tasks', run: () => { setFilter('all'); $('[data-filter="all"]').focus(); } } : null;
      showEmpty(hasQuery ? 'No matching tasks' : filter === 'completed' ? 'No completed tasks yet' : filter === 'open' && all.total ? 'You’re all caught up' : 'Start with one task',
        hasQuery ? 'Try another search or clear it to see this list again.' : filter === 'completed' ? 'Check off a task to move it here. You can reopen it anytime.' : filter === 'open' && all.total ? 'Everything on your list is complete. Add a new task when you’re ready.' : 'Use New task to add something you want to get done.', action);
    }
    $('#total-count').textContent = all.total;
    $('#open-count').textContent = open.total;
    $('#done-count').textContent = all.total - open.total;
    const query = $('#search').value.trim();
    $('#search-summary').hidden = !query;
    $('#search-summary').textContent = `${page.total} ${page.total === 1 ? 'match' : 'matches'} for “${query}” in ${filter === 'all' ? 'all tasks' : filter === 'open' ? 'to do' : 'completed'}`;
    taskList.setAttribute('aria-busy', 'false');
    $('#storage-status').textContent = 'Saved in this browser · No cloud sync';
    nextOffset = page.nextOffset;
    $('#pagination').hidden = page.total <= pageSize;
    $('#previous-page').disabled = offset === 0;
    $('#next-page').disabled = nextOffset === null;
    $('#page-summary').textContent = `${offset + 1}–${offset + page.items.length} of ${page.total}`;
  } catch (error) {
    taskList.setAttribute('aria-busy', 'false');
    $('#storage-status').textContent = 'Could not read task storage. Reload to try again.';
    toast(`Could not read your tasks: ${error.message}`);
  }
}

function setFilter(value) {
  filter = value; offset = 0;
  for (const button of document.querySelectorAll('[data-filter]')) {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  }
  refresh();
}

function openEditor(item) {
  if (!registry) return;
  editingId = item?.id || null;
  $('#item-form').reset();
  $('#item-title').value = item?.title || '';
  $('#item-notes').value = item?.notes || '';
  $('#item-priority').value = item?.priority || 'normal';
  $('#item-date').value = item?.dueDate || '';
  $('#dialog-title').textContent = item ? 'Edit task' : 'New task';
  $('#save-item').textContent = item ? 'Save changes' : 'Add task';
  $('#form-error').textContent = '';
  dialog.showModal();
  $('#item-title').focus();
}

$('#new-item').addEventListener('click', () => openEditor());
$('#close-dialog').addEventListener('click', () => dialog.close());
$('#cancel-dialog').addEventListener('click', () => dialog.close());
$('#item-form').addEventListener('submit', async event => {
  event.preventDefault();
  const args = Object.fromEntries(new FormData(event.target));
  if (editingId) args.id = editingId;
  $('#save-item').disabled = true;
  try {
    const result = await registry.execute(editingId ? 'edit_item' : 'add_item', args, { actor: 'human' });
    if (!result.success) { $('#form-error').textContent = result.error; return; }
    dialog.close();
    if (!editingId) { $('#search').value = ''; setFilter('all'); }
    toast(editingId ? 'Changes saved.' : 'Task added.');
  } catch { $('#form-error').textContent = 'Could not confirm the save. Review saved tasks before retrying.'; }
  finally { $('#save-item').disabled = false; }
});
for (const button of document.querySelectorAll('[data-filter]')) button.addEventListener('click', () => setFilter(button.dataset.filter));
$('#search').addEventListener('input', () => { offset = 0; if (store) refresh(); });
$('#previous-page').addEventListener('click', () => { offset = Math.max(0, offset - pageSize); refresh(); });
$('#next-page').addEventListener('click', () => { if (nextOffset !== null) { offset = nextOffset; refresh(); } });
function setAssistantVisible(visible, focus = false) {
  $('.workspace').classList.toggle('assistant-hidden', !visible);
  $('#assistant-panel').hidden = !visible;
  $('#toggle-assistant').setAttribute('aria-expanded', String(visible));
  if (focus) {
    if (visible) {
      if (questionView?.active) questionView.focus(); else $('#close-assistant').focus({ preventScroll: true });
      if (innerWidth <= 760) $('#assistant-panel').scrollIntoView({ behavior: 'instant', block: 'start' });
    } else $('#toggle-assistant').focus();
  }
}
setAssistantVisible(!matchMedia('(max-width: 760px)').matches);
$('#toggle-assistant').addEventListener('click', () => setAssistantVisible($('#assistant-panel').hidden, true));
$('#close-assistant').addEventListener('click', () => setAssistantVisible(false, true));

function syncChatControls() {
  $('#send-message').disabled = !agent || running || !chatInput.value.trim();
  $('#stop-agent').hidden = !running;
  $('#send-message').hidden = running;
  const local = modelSettings?.saved.route.primary === 'local_http';
  const available = local || aiSupported;
  $('#enable-ai').hidden = Boolean(session) || !available;
  $('#enable-ai').disabled = initializing || (local && !modelSettings.tested) || !available;
  $('#model-settings').disabled = !modelSettings || running || initializing;
  $('#export-run').disabled = !lastRunId || running;
  messages.hidden = !available;
  $('#chat-form').hidden = !available;
  $('#assistant-panel').classList.toggle('unavailable', !available);
  $('#new-chat').disabled = running || initializing;
  $('#new-chat').hidden = !messages.querySelector('.message');
  chatInput.disabled = !agent;
  chatInput.placeholder = agent ? 'Ask about your tasks…' : 'Enable local AI to start chatting';
  chatInput.readOnly = running;
  for (const button of document.querySelectorAll('[data-suggestion]')) button.disabled = !agent || running;
}

function addMessage(role, text, error = false) {
  const message = element('div', `message ${role === 'user' ? 'user' : 'assistant-message'}${error ? ' error' : ''}`);
  message.append(element('span', 'message-label', role === 'user' ? 'YOU' : 'DAYLIST'), document.createTextNode(text));
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
}

function onAgentEvent(event) {
  activeRunId = event.runId;
  questionView?.event(event);
  if (event.type.startsWith('user_input_')) {
    const waiting = event.type === 'user_input_requested';
    $('#activity-status').textContent = waiting ? 'Waiting for your answer' : event.type === 'user_input_submitted' ? 'Answer sent. Continuing.' : 'Question cancelled.';
    $('#toggle-assistant').setAttribute('aria-label', waiting ? 'Assistant — Answer needed' : 'Assistant');
    $('#toggle-assistant').classList.toggle('answer-needed', waiting);
  }
  if (event.type === 'provider_fallback') {
    $('#provider-status').textContent = 'Fallback to Chrome · continuing with saved operation evidence';
    $('#ai-status').textContent = 'Chrome AI ready · fallback';
  }
  if (event.type === 'context_measurement') {
    const m = event.measurement;
    $('#context-status').textContent = m.provenance === 'measured' ? `Context ${m.retained} + next ${m.next} / ${m.capacity} Chrome units · 20% reply reserve` : m.provenance === 'estimated' ? `Configured window ${m.capacity} tokens · input ${m.inputChars} characters · preflight tokens unknown` : `Chrome context ${m.retained ?? 'Unknown'} / ${m.capacity ?? 'Unknown'} units · next input Unknown`;
  }
  if (event.type === 'model') $('#activity-status').textContent = `Thinking · step ${event.iteration} of 12`;
  if (event.type === 'invalid_response') $('#activity-status').textContent = 'The model returned an invalid action. Asking it to correct the response…';
  if (event.type === 'tool_start') $('#activity-status').textContent = `Using ${event.name}…`;
  if (event.type === 'tool_result') {
    const details = element('details', `tool-trace${event.result.success ? '' : ' failed'}`);
    const summary = event.name === 'request_user_input' && event.result.success ? '✓ Question answered' : `${event.result.success ? '✓' : '!'} ${event.name} · ${event.result.success ? 'done' : 'failed'} · ${event.durationMs} ms`;
    details.append(element('summary', '', summary),
      element('pre', '', JSON.stringify({ arguments: event.arguments, result: event.result }, null, 2)));
    messages.append(details);
    messages.scrollTop = messages.scrollHeight;
  }
}

function releaseSession() {
  broker?.dispose(); questionView?.clear();
  session?.destroy(); session = null; agent = null;
  $('#ai-dot').classList.remove('ready');
  $('#ai-status').textContent = 'Local AI disconnected';
  $('#enable-ai').textContent = 'Enable local AI';
  $('#model-help').textContent = 'Enable local AI to start a fresh conversation. Your saved tasks are unchanged.';
  syncChatControls();
}

function setupChatRuntime() {
  broker = new UserInputBroker();
  questionView = new UserInputView({ host: messages, broker, cancel: cancelRun, visible: () => !$('#assistant-panel').hidden, status: $('#activity-status') });
  chatExecutor = createChatExecutor(connection.executor || registry, broker, policy);
}
function cancelRun() { controller?.abort(); broker?.dispose(); session?.destroy(); }
function requestFallback({ reason, create, signal }) {
  return new Promise((resolve, reject) => {
    const card = element('section', 'fallback-card');
    const text = element('p', '', `${reason} Continue this run with Chrome, preserving saved changes and the remaining step limit?`);
    const yes = element('button', 'button primary', 'Enable Chrome and Continue'); yes.type = 'button';
    const no = element('button', 'button secondary', 'Stop this run'); no.type = 'button';
    const clean = () => { signal.removeEventListener('abort', abort); yes.disabled = no.disabled = true; };
    const abort = () => { clean(); text.textContent = 'Fallback cancelled.'; reject(signal.reason || abortError()); };
    no.addEventListener('click', cancelRun);
    yes.addEventListener('click', () => {
      yes.disabled = true;
      // Preserve user activation for model creation/download.
      let pending; try { pending = create(); } catch (e) { text.textContent = e.message; yes.disabled = false; return; }
      pending.then(provider => { if (signal.aborted) { provider.dispose(); return; } clean(); text.textContent = 'Continuing with Chrome. Saved tools are not replayed.'; resolve(provider); }, e => { if (!signal.aborted) { text.textContent = `Could not enable Chrome: ${e.message}`; yes.disabled = false; } });
    });
    card.append(text, yes, no); messages.append(card); signal.addEventListener('abort', abort, { once: true });
    if (signal.aborted) abort();
    $('#activity-status').textContent = 'Provider choice needed';
  });
}

$('#enable-ai').addEventListener('click', async () => {
  if (!registry || initializing || running) return;
  initializing = true;
  $('#enable-ai').disabled = true;
  $('#enable-ai').textContent = 'Preparing local model…';
  $('#ai-status').textContent = 'Preparing local model…';
  syncChatControls();
  try {
    setupChatRuntime();
    // Invoke create immediately in this click handler, before any other await.
    session = new SessionManager({ ...modelSettings.connection(), requestFallback, onProgress: fraction => {
      $('#enable-ai').textContent = `Downloading model · ${Math.round(fraction * 100)}%`;
      $('#ai-status').textContent = `Downloading local model · ${Math.round(fraction * 100)}%`;
    } });
    await session.prepare([{ role: 'system', content: systemPrompt(chatExecutor.definitions()) }], { responseSchema: responseSchema(chatExecutor.definitions()) });
    agent = new AgentLoop({ registry: chatExecutor, session, onEvent: onAgentEvent, interactionBroker: broker, runtime, identity, threadId, policy });
    $('#ai-status').textContent = session.identity.provider === 'chrome' ? 'Local AI ready' : 'Local endpoint ready';
    $('#provider-status').textContent = session.identity.provider === 'chrome' ? 'Chrome Prompt API · model identity not exposed' : `Local HTTP · ${session.identity.model}`;
    $('#context-status').textContent = 'Context capacity / usage: Unknown until measured';
    $('#ai-dot').classList.add('ready');
    $('#model-help').textContent = session.identity.provider === 'chrome' ? 'Chrome’s local model is ready. Chat and task data are processed on this device.' : 'Requests go only to the configured endpoint. Verify its server uses a locally served model.';
    if ($('.assistant-intro p')) $('.assistant-intro p').textContent = 'Ask about your tasks, or choose an example below to start a request.';
  } catch (error) {
    releaseSession();
    $('#model-help').textContent = `Could not start local AI: ${error.message}`;
    toast(`Could not start local AI: ${error.message}`);
  } finally {
    initializing = false;
    $('#enable-ai').disabled = false;
    syncChatControls();
    if (agent && !$('#assistant-panel').hidden) chatInput.focus();
  }
});

chatInput.addEventListener('input', syncChatControls);
chatInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    if (!$('#send-message').disabled && !running) $('#chat-form').requestSubmit();
  }
});
for (const button of document.querySelectorAll('[data-suggestion]')) button.addEventListener('click', () => {
  chatInput.value = button.dataset.suggestion;
  chatInput.focus();
  syncChatControls();
});

$('#chat-form').addEventListener('submit', async event => {
  event.preventDefault();
  if (!agent || running || !chatInput.value.trim()) return;
  running = true;
  const prompt = chatInput.value.trim();
  chatInput.value = '';
  if ($('.assistant-intro')) { messages.replaceChildren(); }
  addMessage('user', prompt);
  controller = new AbortController();
  syncChatControls();
  try {
    const result = await agent.run(prompt, { signal: controller.signal });
    lastRunId = result.runId;
    addMessage('assistant', result.text, result.status !== 'completed');
    if (result.status !== 'completed') {
      releaseSession();
      $('#model-help').textContent = 'The previous run stopped. Review the saved task changes and tool results, then enable a fresh AI session to continue.';
    }
  } catch (error) {
    addMessage('assistant', error.message, true);
    releaseSession();
  } finally {
    running = false; controller = null; activeRunId = null;
    $('#activity-status').textContent = '';
    syncChatControls();
    if (agent && !$('#assistant-panel').hidden) chatInput.focus({ preventScroll: true });
  }
});
$('#stop-agent').addEventListener('click', cancelRun);
$('#new-chat').addEventListener('click', () => {
  releaseSession();
  threadId = crypto.randomUUID();
  messages.replaceChildren();
  addMessage('assistant', 'A fresh conversation. Your tasks are right where you left them. Enable local AI to continue.');
});

async function initialize() {
  try {
    store = await TodoStore.open();
    runtime = new RuntimeStore(store.db);
    const storedIdentity = await runtime.get('settings', 'local-identity');
    identity = { ownerId: storedIdentity.ownerId, deviceId: storedIdentity.deviceId };
    registry = new ToolRegistry(store, { policy, identity });
    $('#new-item').disabled = false;
    store.addEventListener('change', refresh);
    store.addEventListener('versionchange', () => {
      $('#new-item').disabled = true;
      $('#storage-status').textContent = 'Task storage changed. Reload to continue.';
      toast('The database changed in another tab. Reload this page to continue.');
    });
    connection = await registerWebMCP(registry);
    modelSettings = new ModelSettingsView({ dialog: $('#model-dialog'), profiles: new ProviderProfileStore(runtime), status: $('#endpoint-status'), schema: () => responseSchema(createChatExecutor(connection.executor || registry, null, policy).definitions()), changed: () => { releaseSession(); syncChatControls(); } });
    await modelSettings.load();
    $('#model-settings').disabled = false;
    $('#webmcp-status').textContent = connection.message;
    await refresh();
    const availability = await modelAvailability();
    const help = {
      unsupported: 'This browser can’t run local AI. You can still add, edit, and complete tasks. See browser setup below to use the assistant in a compatible desktop Chrome.',
      unavailable: 'Local AI isn’t available on this device. You can still manage your tasks. See browser setup below for requirements.',
      downloadable: 'Enable local AI to download Chrome’s local model. The initial download requires a network connection and may take several minutes.',
      downloading: 'Chrome is downloading the local model. Click Enable local AI to connect and watch its progress.',
      available: 'Chrome’s local model is available. Click Enable local AI to start a private, on-device conversation.',
    };
    $('#model-help').textContent = help[availability] || `Model state: ${availability}`;
    aiSupported = ['available', 'downloadable', 'downloading'].includes(availability);
    $('#enable-ai').disabled = !aiSupported;
    $('#ai-status').textContent = aiSupported ? 'Ready to connect' : 'Local AI unavailable';
    $('#assistant-panel').classList.toggle('unavailable', !aiSupported);
    messages.hidden = !aiSupported;
    $('#chat-form').hidden = !aiSupported;
    syncChatControls();
  } catch (error) {
    if (!store) {
      taskList.replaceChildren();
      showEmpty('Task storage is unavailable', 'Reload the page to try again. Tasks require browser storage to be enabled.');
      taskList.setAttribute('aria-busy', 'false');
      $('#storage-status').textContent = 'Task storage unavailable';
    }
    $('#model-help').textContent = error.message;
    $('#ai-status').textContent = 'Setup needs attention';
    toast(error.message);
  }
}

window.addEventListener('pagehide', () => {
  cancelRun(); modelSettings?.testing?.abort();
  if (modelSettings) { modelSettings.token = ''; modelSettings.field('token').value = ''; }
  if (activeRunId) runtime?.interruptRun(activeRunId).catch(() => {});
  connection?.dispose();
  store?.close();
});
// pagehide closes resources even for bfcache entries; reopen them on restoration.
window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });
initialize();
$('#model-settings').addEventListener('click', () => modelSettings?.open());
$('#export-run').addEventListener('click', async () => {
  try {
    const events = await runtime.events(lastRunId);
    const blob = new Blob([JSON.stringify({ version: 1, runId: lastRunId, events }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = `daylist-run-${lastRunId}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch { toast('Could not export the run log.'); }
});
