import { ValidationError } from '@/core/errors';

/**
 * Validate properties, case any property is undefined or null, will throw a ValidationError
 */
function validateProperties<T>(context: T, properties: string[]): void {
  properties.forEach((prop) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((context as any)[prop] === undefined || (context as any)[prop] === null) {
      throw new ValidationError(`${prop} is required`);
    }
  });
}

export { validateProperties };
