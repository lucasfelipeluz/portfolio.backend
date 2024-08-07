import { strings } from '@/core/utils';
import { ICacheProvider } from '@/infrastructure/interfaces';
import { RedisClientType, SetOptions, createClient } from 'redis';
import { FindOptions } from 'sequelize';
import { injectable } from 'tsyringe';

@injectable()
class CacheProvider<T> implements ICacheProvider<T> {
  private readonly client: RedisClientType;

  constructor() {
    this.client = createClient();
    this.client.connect().catch(console.error);
  }

  private checkClient(): void {
    if (!this.client.isReady && !this.client.isOpen) {
      throw new Error(strings.redisError);
    }
  }

  async get(key: string, filter: FindOptions): Promise<T[] | T | null> {
    try {
      this.checkClient();

      const result = await this.client.get(`${key}-${JSON.stringify(filter)}`);

      if (!result) {
        return null;
      }

      return JSON.parse(result);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async create(
    key: string,
    filter: FindOptions,
    value: T[] | T,
    options?: SetOptions,
  ): Promise<void> {
    try {
      this.checkClient();

      await this.client.set(`${key}-${JSON.stringify(filter)}`, JSON.stringify(value), options);
    } catch (error) {
      console.error(error);
    }
  }

  async clearWhenStartingWith(key: string): Promise<void> {
    try {
      this.checkClient();

      const keysToDelete = await this.client.keys(`${key}*`);

      for (const key of keysToDelete) {
        this.client.del(key);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async clearWhenStartingWithThese(keys: string[]): Promise<void> {
    try {
      this.checkClient();

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
    } catch (error) {
      console.error(error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      this.checkClient();

      await this.client.flushAll();
    } catch (error) {
      console.error(error);
    }
  }
}

export default CacheProvider;
