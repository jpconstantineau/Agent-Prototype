// Closed JSON Schema subset: unsupported keywords and types fail closed.
export class ValidationError extends Error {
  constructor(message) { super(message); this.name = 'ValidationError'; this.code = 'invalid_arguments'; }
}
const keywords = new Set(['type','properties','required','additionalProperties','anyOf','const','enum','items','minItems','maxItems','uniqueItems','minLength','maxLength','minimum','maximum','pattern','format','description','title']);
const fail = message => { throw new ValidationError(message); };
function checkSchema(schema, depth = 0) {
  if (!schema || typeof schema !== 'object' || Array.isArray(schema) || depth > 40) fail('Unsupported schema.');
  for (const key of Object.keys(schema)) if (!keywords.has(key)) fail(`Unsupported schema keyword: ${key}.`);
  if (schema.anyOf) {
    if (!Array.isArray(schema.anyOf) || !schema.anyOf.length) fail('Unsupported anyOf schema.');
    schema.anyOf.forEach(s => checkSchema(s, depth + 1));
  }
  if (schema.properties) Object.values(schema.properties).forEach(s => checkSchema(s, depth + 1));
  if (schema.items) checkSchema(schema.items, depth + 1);
  if (schema.type && !['object','array','string','integer','number','boolean','null'].includes(schema.type)) fail('Unsupported schema type.');
}
export function validate(schema, value, path = 'arguments', depth = 0) {
  if (depth === 0) checkSchema(schema);
  if (!schema || typeof schema !== 'object' || Array.isArray(schema) || depth > 40) fail(`${path} has an unsupported schema.`);
  for (const key of Object.keys(schema)) if (!keywords.has(key)) fail(`Unsupported schema keyword: ${key}.`);
  if (schema.anyOf && !schema.anyOf.some(s => { try { validate(s, value, path, depth + 1); return true; } catch { return false; } })) fail(`${path} does not match an allowed response.`);
  if (Object.hasOwn(schema, 'const') && value !== schema.const) fail(`${path} has an invalid value.`);
  if (schema.enum && !schema.enum.includes(value)) fail(`${path} must be one of: ${schema.enum.join(', ')}.`);
  if (!schema.type) { if (!schema.anyOf) fail(`${path} has an unsupported schema type.`); return; }
  switch (schema.type) {
    case 'object':
      if (value === null || typeof value !== 'object' || Array.isArray(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) fail(`${path} must be an object.`);
      for (const key of schema.required || []) if (!Object.hasOwn(value, key)) fail(`${path}.${key} is required.`);
      for (const [key, val] of Object.entries(value)) {
        if (Object.hasOwn(schema.properties || {}, key)) validate(schema.properties[key], val, `${path}.${key}`, depth + 1);
        else if (schema.additionalProperties !== true) fail(`${path}.${key} is not allowed.`);
      }
      break;
    case 'array':
      if (!Array.isArray(value)) fail(`${path} must be an array.`);
      if (value.length < (schema.minItems ?? 0) || value.length > (schema.maxItems ?? Infinity)) fail(`${path} has an invalid number of entries.`);
      if (!schema.items) fail(`${path} requires an item schema.`);
      for (let i = 0; i < value.length; i++) validate(schema.items, value[i], `${path}[${i}]`, depth + 1);
      if (schema.uniqueItems && (value.some(v => typeof v !== 'string') || new Set(value).size !== value.length)) fail(`${path} requires unique string entries.`);
      break;
    case 'string':
      if (typeof value !== 'string') fail(`${path} must be a string.`);
      if (value.trim().length < (schema.minLength ?? 0)) fail(`${path} cannot be blank.`);
      if (value.length > (schema.maxLength ?? Infinity)) fail(`${path} exceeds ${schema.maxLength} characters.`);
      if (schema.pattern && !new RegExp(schema.pattern, 'u').test(value)) fail(`${path} has an invalid format.`);
      if (schema.format && schema.format !== 'date') fail(`${path} has an unsupported format.`);
      if (schema.format === 'date' && value !== '' && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0,10) !== value)) fail(`${path} must be a real YYYY-MM-DD date, or empty to clear it.`);
      break;
    case 'integer': case 'number':
      if (typeof value !== 'number' || !Number.isFinite(value) || (schema.type === 'integer' && !Number.isSafeInteger(value)) || value < (schema.minimum ?? -Infinity) || value > (schema.maximum ?? Infinity)) fail(`${path} must be a finite ${schema.type} within its bounds.`);
      break;
    case 'boolean': if (typeof value !== 'boolean') fail(`${path} must be a boolean.`); break;
    case 'null': if (value !== null) fail(`${path} must be null.`); break;
    default: fail(`${path} has an unsupported schema type.`);
  }
}
export const object = (properties, required = []) => ({ type: 'object', properties, required, additionalProperties: false });
