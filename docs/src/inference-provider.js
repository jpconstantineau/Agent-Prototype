export const MODEL_OPTIONS = {
  expectedInputs: [{ type: 'text', languages: ['en'] }],
  expectedOutputs: [{ type: 'text', languages: ['en'] }],
};
export class ProviderError extends Error {
  constructor(code, message, recoverable = false) { super(message); this.name = 'ProviderError'; this.code = code; this.recoverable = recoverable; }
}
export class RetryInference extends Error {
  constructor() { super('Continue at the next counted inference boundary.'); this.name = 'RetryInference'; }
}
export const unknownUsage = () => ({ input: null, output: null, context: null, provenance: 'unknown', unit: 'unknown' });
export function finite(value) { return Number.isFinite(value) && value >= 0 ? value : null; }
