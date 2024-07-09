import ValidationError from '@/domain/errors/ValidationError';

/**
 * Validate properties, case any property is undefined or null, will throw a ValidationError
 */
function validateProperties<T extends Record<string, unknown>>(
  context: T,
  properties: string[],
): void {
  properties.forEach((prop) => {
    if (context[prop] === undefined || context[prop] === null) {
      throw new ValidationError(`${prop} is required`);
    }
  });
}

export { validateProperties };
