/**
 * Get cache key with user id or not
 */
export const getCacheKey = (key: string, userId: string): string => {
  if (!userId) {
    return key;
  } else {
    return `${key}:${userId}`;
  }
};
