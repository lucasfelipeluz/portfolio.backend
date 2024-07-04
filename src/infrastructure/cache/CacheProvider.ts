import { RedisClientType, createClient } from 'redis';
import ICacheProvider from './ICacheProvider';
import { injectable } from 'tsyringe';
import { WhereOptions } from 'sequelize';

@injectable()
class CacheProvider<T> implements ICacheProvider<T> {
  private readonly client: RedisClientType;

  constructor() {
    this.client = createClient();
    this.client.connect().catch(console.error);
  }

  async get(key: string, filter: WhereOptions): Promise<T[] | T | null> {
    const result = await this.client.get(`${key}-${JSON.stringify(filter)}`);

    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  async create(key: string, filter: WhereOptions, value: T[] | T): Promise<void> {
    await this.client.set(`${key}-${JSON.stringify(filter)}`, JSON.stringify(value));
  }

  async clearWhenStartingWith(key: string): Promise<void> {
    const keysToDelete = await this.client.keys(`${key}*`);

    for (const key of keysToDelete) {
      this.client.del(key);
    }
  }

  async clearWhenStartingWithThese(keys: string[]): Promise<void> {
    const keysToDelete = new Set<string>();

    const promiseSearchKeys = keys.map(async (key) => {
      const keys = await this.client.keys(`${key}*`);

      keys.forEach((key) => keysToDelete.add(key));
    });

    await Promise.all(promiseSearchKeys);

    const promiseDeleteKeys = Array.from(keysToDelete).map(async (key) => {
      return await this.client.del(key);
    });

    await Promise.all(promiseDeleteKeys);
  }

  async clearAll(): Promise<void> {
    await this.client.flushAll();
  }
}

export default CacheProvider;
