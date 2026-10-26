// The deliberately small JSON Schema subset used by this app's tool contracts.
// Validate again at the execution boundary: model output is never trusted code.
export function validate(schema, value, path = 'arguments') {
  if (schema.anyOf) {
    if (!schema.anyOf.some(option => {
      try { validate(option, value, path); return true; } catch { return false; }
    })) throw new Error(`${path} does not match an allowed response.`);
    return;
  }
  if (Object.hasOwn(schema, 'const') && value !== schema.const) throw new Error(`${path} has an invalid value.`);
  if (schema.enum && !schema.enum.includes(value)) throw new Error(`${path} must be one of: ${schema.enum.join(', ')}.`);
  if (schema.type === 'object') {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${path} must be an object.`);
    for (const key of schema.required || []) {
      if (!Object.hasOwn(value, key)) throw new Error(`${path}.${key} is required.`);
    }
    for (const [key, val] of Object.entries(value)) {
      if (!Object.hasOwn(schema.properties, key)) {
        if (schema.additionalProperties === false) throw new Error(`${path}.${key} is not allowed.`);
      } else validate(schema.properties[key], val, `${path}.${key}`);
    }
  } else if (schema.type === 'string') {
    if (typeof value !== 'string') throw new Error(`${path} must be a string.`);
    if (schema.minLength && value.trim().length < schema.minLength) throw new Error(`${path} cannot be blank.`);
    if (schema.maxLength && value.length > schema.maxLength) throw new Error(`${path} exceeds ${schema.maxLength} characters.`);
    if (schema.format === 'date' && value !== '') {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) {
        throw new Error(`${path} must be a real YYYY-MM-DD date, or empty to clear it.`);
      }
    }
  } else if (schema.type === 'integer') {
    if (!Number.isInteger(value) || value < schema.minimum || value > schema.maximum) throw new Error(`${path} must be an integer from ${schema.minimum} to ${schema.maximum}.`);
  } else if (schema.type === 'boolean' && typeof value !== 'boolean') throw new Error(`${path} must be a boolean.`);
}

export const object = (properties, required = []) => ({ type: 'object', properties, required, additionalProperties: false });
