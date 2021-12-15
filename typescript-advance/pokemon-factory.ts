import { createObserver } from './observer';

import { Listener } from './types/listener.type';

import { BaseRecord } from './interfaces/baserecord.interface';
import { Database } from './interfaces/database.interface';
import { AfterSetEvent, BeforeSetEvent } from './interfaces/events.interface';

export function createPokemon<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};

    static instance: InMemoryDatabase = new InMemoryDatabase();

    private beforeAddListeners = createObserver<BeforeSetEvent<T>>();

    private afterAddListeners = createObserver<AfterSetEvent<T>>();

    private constructor() {}

    public get(id: string): T {
      return this.db[id];
    }

    public set(newValue: T): void {
      this.beforeAddListeners.publish({
        newValue,
        value: this.db[newValue.id],
      });

      this.db[newValue.id] = newValue;

      this.afterAddListeners.publish({
        value: newValue,
      });
    }

    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
      return this.beforeAddListeners.subscribe(listener);
    }

    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
      return this.afterAddListeners.subscribe(listener);
    }

    visit(visitor: (item: T, index: number) => void): void {
      Object.values(this.db).forEach(visitor);
    }

    selectBest(scoreStrategy: (item: T) => number): T | undefined {
      const found: {
        max: number;
        item: T | undefined;
      } = {
        max: 0,
        item: undefined,
      };

      Object.values(this.db).reduce((acc, curr) => {
        const score = scoreStrategy(curr);

        if (score > acc.max) {
          acc.max = score;
          acc.item = curr;
        }

        return acc;
      }, found);

      return found.item;
    }

    transform<K>(handler: (item: T, index: number) => K): K[] {
      return Object.values(this.db).map(handler);
    }
  }

  return InMemoryDatabase;
}
