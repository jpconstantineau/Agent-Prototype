import { validateQuestionRequest, canonicalAnswers, validateQuestionResult } from './user-input-contract.js';
import { ValidationError } from './schema.js';
import { abortError, failure, immutable } from './runtime.js';
export class UserInputBroker {
  constructor() { this.run = null; this.pending = null; this.disposed = false; }
  beginRun(runId, { emit }) {
    if (this.disposed || this.run) throw new Error('Question broker is unavailable or busy.');
    this.run = { runId, emit };
  }
  request(args, { signal } = {}) {
    signal?.throwIfAborted();
    try { validateQuestionRequest(args); } catch (e) { if (e instanceof ValidationError) return Promise.resolve(failure('invalid_arguments', e.message)); throw e; }
    if (!this.run || this.disposed) return Promise.resolve(failure('unavailable', 'The question host is unavailable.'));
    if (this.pending) return Promise.resolve(failure('busy', 'Another question is already waiting.'));
    const argumentsSnapshot = immutable(args), run = this.run;
    return new Promise((resolve, reject) => {
      const pending = { runId: run.runId, requestId: crypto.randomUUID(), arguments: argumentsSnapshot, signal, settled: false, resolve, reject };
      pending.clean = () => { signal?.removeEventListener('abort', pending.abort); if (this.pending === pending) this.pending = null; pending.resolve = pending.reject = null; };
      pending.abort = () => {
        if (pending.settled) return;
        pending.settled = true; const rejectPending = pending.reject; pending.clean();
        try { run.emit({ type: 'user_input_cancelled', runId: run.runId, requestId: pending.requestId, reason: 'cancelled' }); }
        finally { rejectPending(signal?.reason?.name === 'AbortError' ? signal.reason : abortError()); }
      };
      this.pending = pending;
      signal?.addEventListener('abort', pending.abort, { once: true });
      if (signal?.aborted) { pending.abort(); return; }
      try { run.emit({ type: 'user_input_requested', runId: pending.runId, requestId: pending.requestId, arguments: argumentsSnapshot }); }
      catch (e) { if (!pending.settled) { pending.settled = true; pending.clean(); reject(e); } }
    });
  }
  submit(submission) {
    const p = this.pending;
    if (!p || p.settled || p.signal?.aborted || !this.run || p.runId !== this.run.runId || submission?.requestId !== p.requestId) return { accepted: false, errors: [{ questionId: null, code: 'stale_request', message: 'This question is no longer waiting.' }] };
    const checked = canonicalAnswers(p.arguments, submission);
    if (checked.errors) return { accepted: false, errors: checked.errors };
    const result = { success: true, version: 1, requestId: p.requestId, status: 'answered', answers: checked.answers };
    validateQuestionResult(p.arguments, result);
    p.settled = true; const resolve = p.resolve, reject = p.reject; p.clean();
    try { this.run.emit({ type: 'user_input_submitted', runId: p.runId, requestId: p.requestId, result: immutable(result) }); resolve(result); }
    catch (e) { reject(e); }
    return { accepted: true };
  }
  endRun(runId) { if (this.run?.runId === runId) { try { this.pending?.abort(); } finally { this.run = null; } } }
  dispose() { if (this.disposed) return; this.disposed = true; if (this.run) this.endRun(this.run.runId); }
}
