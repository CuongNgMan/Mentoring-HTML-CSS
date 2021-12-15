import { BaseRecord } from './baserecord.interface';

import { Listener } from '../types/listener.type';
import { AfterSetEvent, BeforeSetEvent } from './events.interface';

export interface Database<T extends BaseRecord> {
  get(id: string): T | undefined;
  set(newValue: T): void;

  onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
  onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;

  visit(visitor: (item: T, index: number) => void): void;
  selectBest(scoreStrategy: (item: T) => number): T | undefined;
  transform<K>(map: (item: T, index: number) => K): K[];
}
