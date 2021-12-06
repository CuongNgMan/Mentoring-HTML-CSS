type Listener<EventType> = (ev: EventType) => void;

function createObserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
} {
  let listeners: Listener<EventType>[] = [];

  return {
    subscribe: (listener: Listener<EventType>): (() => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    publish: (event: EventType) => {
      listeners.forEach((l) => l(event));
    },
  };
}

interface BeforeSetEvent<T> {
  value: T;
  newValue: T;
}

interface AfterSetEvent<T> {
  value: T;
}

interface Pokemon {
  id: string;
  attack: number;
  defence: number;
}

interface BaseRecord {
  id: string;
}

interface Database<T extends BaseRecord> {
  get(id: string): T | undefined;
  set(newValue: T): void;

  onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
  onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;

  visit(visitor: (item: T, index: number) => void): void;
  selectBest(scoreStrategy: (item: T) => number): T | undefined;
  transform<K>(map: (item: T, index: number) => K): K[];
}

function createPokemon<T extends BaseRecord>() {
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

const PokemonDB = createPokemon<Pokemon>();

const unsubscribeOnBeforeAdd = PokemonDB.instance.onBeforeAdd(
  ({ newValue, value }) => {
    console.log("on before add", newValue);
    console.log("on before add", value);
  }
);

const unsubscribeOnAfterAdd = PokemonDB.instance.onAfterAdd((value) => {
  console.log("on after add", value);
});

PokemonDB.instance.set({ id: "pikachu", attack: 100, defence: 100 });

unsubscribeOnBeforeAdd();

PokemonDB.instance.set({ id: "charmander", attack: 110, defence: 200 });

PokemonDB.instance.set({ id: "mewtwo", attack: 1000, defence: 1000 });

PokemonDB.instance.visit((p, _i) => {
  console.log("pokemon: ", p.id);
});

type MetaPokemon = {
  _id: string;
  _attack: number;
  _defence: number;
};

const temp = PokemonDB.instance.transform<MetaPokemon>((p, _i) => {
  return {
    _id: p.id,
    _attack: p.attack,
    _defence: p.defence,
  };
});

const bestDefence = PokemonDB.instance.selectBest(({ defence }) => defence);
console.log("best defence", bestDefence);

const bestAttack = PokemonDB.instance.selectBest(({ attack }) => attack);
console.log("best attack", bestAttack);

