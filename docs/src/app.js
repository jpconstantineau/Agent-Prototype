import { TodoStore } from './store.js';
import { ToolRegistry, registerWebMCP } from './tools.js';
import { AgentLoop, modelAvailability, createModelSession } from './agent.js';

const $ = selector => document.querySelector(selector);
let store, registry, connection, session, agent, controller;
let filter = 'all', offset = 0, nextOffset = null, editingId = null;
let refreshId = 0, toastTimer, running = false, initializing = false;
const pageSize = 25;
const taskList = $('#task-list');
const chatInput = $('#chat-input');
const messages = $('#messages');
const dialog = $('#item-dialog');

$('#today').textContent = new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase();

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

function showEmpty(title, description) {
  const empty = element('div', 'empty');
  empty.append(element('div', 'empty-icon', '✓'), element('h3', '', title), element('p', '', description));
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
    const result = await registry.execute('complete_item', { id: item.id, completed: check.checked });
    if (!result.success) { toast(result.error); check.checked = item.completed; }
    check.disabled = false;
  });
  const body = element('div', 'task-body');
  body.append(element('div', 'task-title', item.title));
  if (item.notes) body.append(element('div', 'task-notes', item.notes));
  const meta = element('div', 'task-meta');
  meta.append(element('span', `priority ${item.priority}`, `${item.priority[0].toUpperCase()}${item.priority.slice(1)} priority`));
  if (item.dueDate) {
    const date = new Date(`${item.dueDate}T00:00:00`);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const overdue = !item.completed && date < today;
    meta.append(element('span', `due${overdue ? ' overdue' : ''}`, `${overdue ? 'Overdue · ' : ''}${date.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}`));
  }
  body.append(meta);
  const edit = element('button', 'icon-button edit-item', '✎');
  edit.setAttribute('aria-label', `Edit ${item.title}`);
  edit.title = 'Edit task';
  edit.addEventListener('click', () => openEditor(item));
  row.append(check, body, edit);
  return row;
}

async function refresh() {
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
      showEmpty(hasQuery ? 'Nothing here just yet.' : filter === 'completed' ? 'Small wins belong here.' : filter === 'open' ? 'A little breathing room.' : 'A fresh start, a clear mind.',
        hasQuery ? 'Try a different search, or add a new task.' : filter === 'completed' ? 'Check off a task and you’ll find it here.' : filter === 'open' ? 'You’re all caught up. Add a task whenever you’re ready.' : 'Add your first task, or let the assistant help you get started.');
    }
    $('#total-count').textContent = all.total;
    $('#nav-count').textContent = all.total;
    $('#open-count').textContent = open.total;
    $('#done-count').textContent = all.total - open.total;
    $('#list-count').textContent = page.total;
    nextOffset = page.nextOffset;
    $('#pagination').hidden = page.total <= pageSize;
    $('#previous-page').disabled = offset === 0;
    $('#next-page').disabled = nextOffset === null;
    $('#page-summary').textContent = `${offset + 1}–${offset + page.items.length} of ${page.total}`;
  } catch (error) { toast(`Could not read your tasks: ${error.message}`); }
}

function setFilter(value) {
  filter = value; offset = 0;
  for (const button of document.querySelectorAll('[data-filter]')) {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  }
  for (const button of document.querySelectorAll('[data-view]')) button.classList.toggle('selected', button.dataset.view === filter);
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
$('#quick-add').addEventListener('click', () => openEditor());
$('#close-dialog').addEventListener('click', () => dialog.close());
$('#cancel-dialog').addEventListener('click', () => dialog.close());
$('#item-form').addEventListener('submit', async event => {
  event.preventDefault();
  const args = Object.fromEntries(new FormData(event.target));
  if (editingId) args.id = editingId;
  $('#save-item').disabled = true;
  try {
    const result = await registry.execute(editingId ? 'edit_item' : 'add_item', args);
    if (!result.success) { $('#form-error').textContent = result.error; return; }
    dialog.close();
    toast(editingId ? 'Changes saved.' : 'One more thing out of your head. Task added.');
  } finally { $('#save-item').disabled = false; }
});
for (const button of document.querySelectorAll('[data-filter]')) button.addEventListener('click', () => setFilter(button.dataset.filter));
for (const button of document.querySelectorAll('[data-view]')) button.addEventListener('click', () => setFilter(button.dataset.view));
$('#search').addEventListener('input', () => { offset = 0; if (store) refresh(); });
$('#previous-page').addEventListener('click', () => { offset = Math.max(0, offset - pageSize); refresh(); });
$('#next-page').addEventListener('click', () => { if (nextOffset !== null) { offset = nextOffset; refresh(); } });
$('#toggle-assistant').addEventListener('click', () => {
  const hidden = $('.workspace').classList.toggle('assistant-hidden');
  $('#toggle-assistant').setAttribute('aria-expanded', String(!hidden));
  if (!hidden && innerWidth <= 700) $('#assistant-panel').scrollIntoView({ behavior: 'smooth' });
});

function syncChatControls() {
  $('#send-message').disabled = !agent || running || !chatInput.value.trim();
  $('#stop-agent').hidden = !running;
  $('#send-message').hidden = running;
  $('#enable-ai').hidden = Boolean(session);
  $('#new-chat').disabled = running || initializing;
  chatInput.readOnly = running;
}

function addMessage(role, text, error = false) {
  const message = element('div', `message ${role === 'user' ? 'user' : 'assistant-message'}${error ? ' error' : ''}`);
  message.append(element('span', 'message-label', role === 'user' ? 'YOU' : 'DAYLIST'), document.createTextNode(text));
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
}

function onAgentEvent(event) {
  if (event.type === 'model') $('#activity-status').textContent = `Thinking · step ${event.iteration} of 12`;
  if (event.type === 'invalid_response') $('#activity-status').textContent = 'The model returned an invalid action. Asking it to correct the response…';
  if (event.type === 'tool_start') $('#activity-status').textContent = `Using ${event.name}…`;
  if (event.type === 'tool_result') {
    const details = element('details', `tool-trace${event.result.success ? '' : ' failed'}`);
    details.append(element('summary', '', `${event.result.success ? '✓' : '!'} ${event.name} · ${event.result.success ? 'done' : 'failed'} · ${event.durationMs} ms`),
      element('pre', '', JSON.stringify({ arguments: event.arguments, result: event.result }, null, 2)));
    messages.append(details);
    messages.scrollTop = messages.scrollHeight;
  }
}

function releaseSession() {
  session?.destroy(); session = null; agent = null;
  $('#ai-dot').classList.remove('ready');
  $('#ai-status').textContent = 'Local AI disconnected';
  $('#enable-ai').textContent = 'Enable local AI';
  syncChatControls();
}

$('#enable-ai').addEventListener('click', async () => {
  if (!registry || initializing) return;
  initializing = true;
  $('#enable-ai').disabled = true;
  $('#enable-ai').textContent = 'Preparing local model…';
  $('#ai-status').textContent = 'Preparing local model…';
  syncChatControls();
  try {
    // Invoke create immediately in this click handler, before any other await.
    session = await createModelSession(registry, { onProgress: fraction => {
      $('#enable-ai').textContent = `Downloading model · ${Math.round(fraction * 100)}%`;
      $('#ai-status').textContent = `Downloading local model · ${Math.round(fraction * 100)}%`;
    } });
    agent = new AgentLoop({ registry: connection.executor || registry, session, onEvent: onAgentEvent });
    $('#ai-status').textContent = 'Local AI ready';
    $('#ai-dot').classList.add('ready');
    $('#model-help').textContent = 'The local model is ready. Chat requests and task data are processed on this device.';
    session.addEventListener?.('contextoverflow', () => toast('Older conversation context was dropped. Restate any details the assistant needs.'));
    chatInput.focus();
  } catch (error) {
    releaseSession();
    $('#model-help').textContent = `Could not start local AI: ${error.message}`;
    toast(`Could not start local AI: ${error.message}`);
  } finally {
    initializing = false;
    $('#enable-ai').disabled = false;
    syncChatControls();
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
    addMessage('assistant', result.text, result.status !== 'completed');
    if (result.status !== 'completed') {
      releaseSession();
      $('#model-help').textContent = 'The previous run stopped. Review the saved task changes and tool results, then enable a fresh AI session to continue.';
    }
  } catch (error) {
    addMessage('assistant', error.message, true);
    releaseSession();
  } finally {
    running = false; controller = null;
    $('#activity-status').textContent = '';
    syncChatControls();
  }
});
$('#stop-agent').addEventListener('click', () => {
  controller?.abort();
  // Aborting destroys the session too, ensuring no pending generation leaks into
  // the next request. Committed IndexedDB transactions are intentionally retained.
  session?.destroy();
});
$('#new-chat').addEventListener('click', () => {
  releaseSession();
  messages.replaceChildren();
  addMessage('assistant', 'A fresh conversation. Your tasks are right where you left them. Enable local AI to continue.');
});

async function initialize() {
  try {
    store = await TodoStore.open();
    registry = new ToolRegistry(store);
    store.addEventListener('change', refresh);
    store.addEventListener('versionchange', () => toast('The database changed in another tab. Reload this page to continue.'));
    connection = await registerWebMCP(registry);
    $('#webmcp-status').textContent = connection.message;
    await refresh();
    const availability = await modelAvailability();
    const help = {
      unsupported: 'This browser does not expose the Prompt API. Open the app in a compatible desktop Chrome and follow the setup link. You can still manage all tasks manually.',
      unavailable: 'The local model is unavailable on this device or Chrome configuration. Check the Prompt API setup requirements. Manual task management is ready.',
      downloadable: 'Enable local AI to download Chrome’s local model. The initial download requires a network connection and may take several minutes.',
      downloading: 'Chrome is downloading the local model. Click Enable local AI to connect and watch its progress.',
      available: 'Chrome’s local model is available. Click Enable local AI to start a private, on-device conversation.',
    };
    $('#model-help').textContent = help[availability] || `Model state: ${availability}`;
    const supported = ['available', 'downloadable', 'downloading'].includes(availability);
    $('#enable-ai').disabled = !supported;
    $('#enable-ai').textContent = supported ? 'Enable local AI' : 'Local AI unavailable';
    $('#ai-status').textContent = supported ? 'Local AI · click to connect' : 'Local AI unavailable';
  } catch (error) {
    $('#model-help').textContent = error.message;
    $('#ai-status').textContent = 'Setup needs attention';
    toast(error.message);
  }
}

window.addEventListener('pagehide', () => {
  controller?.abort();
  session?.destroy();
  connection?.dispose();
  store?.close();
});
// pagehide closes resources even for bfcache entries; reopen them on restoration.
window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });
initialize();
