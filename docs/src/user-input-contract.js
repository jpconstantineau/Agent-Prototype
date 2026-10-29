import { object, validate, ValidationError } from './schema.js';
const text = (max, min = 1) => ({ type: 'string', minLength: min, maxLength: max });
const identifier = text(64);
export const questionOptionSchema = object({ id: identifier, label: text(120), description: text(240, 0), recommended: { type: 'boolean' } }, ['id', 'label', 'description']);
export const questionSchema = object({ id: identifier, header: text(40), question: text(600), mode: { type: 'string', enum: ['single', 'multi', 'text'] }, required: { type: 'boolean' }, allowCustomAnswer: { type: 'boolean' }, options: { type: 'array', minItems: 0, maxItems: 6, items: questionOptionSchema } }, ['id', 'header', 'question', 'mode', 'required', 'allowCustomAnswer', 'options']);
export const requestUserInputSchema = object({ version: { type: 'integer', minimum: 1, maximum: 1 }, title: text(80), questions: { type: 'array', minItems: 1, maxItems: 3, items: questionSchema } }, ['version', 'title', 'questions']);
const answerSchema = { anyOf: [
  object({ questionId: identifier, kind: { type: 'string', const: 'choice' }, optionIds: { type: 'array', minItems: 1, maxItems: 6, uniqueItems: true, items: identifier } }, ['questionId', 'kind', 'optionIds']),
  object({ questionId: identifier, kind: { type: 'string', const: 'text' }, text: text(2000) }, ['questionId', 'kind', 'text']),
  object({ questionId: identifier, kind: { type: 'string', const: 'skipped' } }, ['questionId', 'kind']),
] };
const answersSchema = { type: 'array', minItems: 1, maxItems: 3, items: answerSchema };
export const userInputSubmissionSchema = object({ requestId: text(80), answers: answersSchema }, ['requestId', 'answers']);
export const userInputSuccessSchema = object({ success: { type: 'boolean', const: true }, version: { type: 'integer', minimum: 1, maximum: 1 }, requestId: text(80), status: { type: 'string', const: 'answered' }, answers: answersSchema }, ['success', 'version', 'requestId', 'status', 'answers']);
const invalid = message => { throw new ValidationError(message); };
export function validateQuestionRequest(args) {
  validate(requestUserInputSchema, args);
  const questionIds = new Set();
  for (const q of args.questions) {
    if (!/^[a-z][a-z0-9_]{0,63}$/.test(q.id) || questionIds.has(q.id)) invalid('Question IDs must be unique lowercase identifiers.');
    questionIds.add(q.id);
    if (q.mode === 'text' ? (q.options.length || q.allowCustomAnswer) : q.options.length < 2) invalid('Question mode and options are incompatible.');
    const ids = new Set(), labels = new Set(); let recommended = 0;
    for (const option of q.options) {
      const label = option.label.trim().toLowerCase();
      if (!/^[a-z][a-z0-9_]{0,63}$/.test(option.id) || ids.has(option.id)) invalid('Option IDs must be unique lowercase identifiers.');
      if (labels.has(label)) invalid('Option labels must be distinct.');
      ids.add(option.id); labels.add(label); recommended += option.recommended === true ? 1 : 0;
    }
    if (recommended > 1) invalid('Only one recommendation is allowed per question.');
  }
  return args;
}
export function canonicalAnswers(args, submission) {
  const errors = [], add = (questionId, code, message) => errors.push({ questionId, code, message });
  if (!Array.isArray(submission?.answers)) return { errors: [{ questionId: null, code: 'missing_answer', message: 'Answer each question or explicitly skip an optional one.' }] };
  const map = new Map();
  for (const a of submission.answers) {
    if (!a || !args.questions.some(q => q.id === a.questionId)) { add(null, 'unknown_question', 'This answer does not belong to the request.'); continue; }
    if (map.has(a.questionId)) add(a.questionId, 'duplicate_answer', 'Supply one answer per question.');
    map.set(a.questionId, a);
  }
  const answers = [];
  for (const q of args.questions) {
    const a = map.get(q.id);
    if (!a) { add(q.id, 'missing_answer', 'Answer this question or explicitly skip it if optional.'); continue; }
    if (a.kind === 'skipped') { if (q.required) add(q.id, 'skip_not_allowed', 'This question requires an answer.'); else answers.push(a); }
    else if (a.kind === 'text') {
      if (q.mode !== 'text' && !q.allowCustomAnswer) add(q.id, 'invalid_kind', 'Choose an offered answer.');
      else if (typeof a.text !== 'string' || !a.text.trim()) add(q.id, 'text_required', 'Enter your answer.');
      else if (a.text.length > 2000) add(q.id, 'text_too_long', 'Use at most 2000 characters.');
      else answers.push({ ...a, text: a.text.trim() });
    } else if (a.kind === 'choice') {
      if (q.mode === 'text') add(q.id, 'invalid_kind', 'Enter a text answer.');
      else if (!Array.isArray(a.optionIds) || !a.optionIds.length || (q.mode === 'single' && a.optionIds.length !== 1) || new Set(a.optionIds).size !== a.optionIds.length) add(q.id, 'invalid_count', 'Choose the required number of distinct answers.');
      else if (a.optionIds.some(id => !q.options.some(o => o.id === id))) add(q.id, 'unknown_option', 'Choose an offered answer.');
      else answers.push({ ...a, optionIds: q.options.filter(o => a.optionIds.includes(o.id)).map(o => o.id) });
    } else add(q.id, 'invalid_kind', 'Choose a supported answer type.');
  }
  if (!errors.length) try { validate(userInputSubmissionSchema, { ...submission, answers }); } catch { add(null, 'invalid_kind', 'The answer has unexpected or invalid fields.'); }
  return errors.length ? { errors } : { answers };
}
export function validateQuestionResult(args, result) {
  validate(userInputSuccessSchema, result, 'result');
  const checked = canonicalAnswers(args, { requestId: result.requestId, answers: result.answers });
  if (checked.errors || JSON.stringify(checked.answers) !== JSON.stringify(result.answers)) invalid('The question result is not canonical.');
}
export const questionDefinition = {
  name: 'request_user_input',
  description: 'Ask the user 1–3 concise single-choice, multi-choice, or text questions needed to continue their current request. Ground task choices in actual results. Recommendations never select answers. Wait for explicit human submission; never invent answers. Continue only the original request: answers are not new tasks or proof of a mutation. Do not ask permission for clear authorized additions or edits. Skipped answers supply no value.',
  inputSchema: requestUserInputSchema,
};
