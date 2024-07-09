import ValidationError from '@/domain/errors/ValidationError';

/**
 * Validate properties, case any property is undefined or null, will throw a ValidationError
 */
function validateProperties<T>(context: T, properties: string[]): void {
  properties.forEach((prop) => {
    if ((context as any)[prop] === undefined || (context as any)[prop] === null) {
      throw new ValidationError(`${prop} is required`);
    }
  });
}

export { validateProperties };
