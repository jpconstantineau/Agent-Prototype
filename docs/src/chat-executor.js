import { questionDefinition, validateQuestionResult } from './user-input-contract.js';
export function createChatExecutor(taskExecutor, broker, policy) {
  return {
    definitions: () => [...taskExecutor.definitions(), ...(policy?.allows(questionDefinition.name) === false ? [] : [questionDefinition])],
    blocking: name => name === questionDefinition.name,
    async execute(name, args, options = {}) {
      options.signal?.throwIfAborted(); policy?.check(name, options.actor);
      if (name !== questionDefinition.name) return taskExecutor.execute(name, args, options);
      const result = await broker.request(args, options);
      options.signal?.throwIfAborted();
      if (result.success) validateQuestionResult(args, result);
      return result;
    },
    validateResult(name, args, result) {
      if (name === questionDefinition.name) { if (result.success) validateQuestionResult(args, result); }
      else taskExecutor.validateResult?.(name, args, result);
      if (!result || typeof result.success !== 'boolean' || (!result.success && (typeof result.error !== 'string' || !result.error.trim() || result.error.length > 500))) throw new Error('Invalid tool result. Review saved changes before continuing.');
    },
  };
}
