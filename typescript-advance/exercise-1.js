function createObserver() {
    var listeners = [];
    return {
        subscribe: function (listener) {
            listeners.push(listener);
            return function () {
                listeners = listeners.filter(function (l) { return l !== listener; });
            };
        },
        publish: function (event) {
            listeners.forEach(function (l) { return l(event); });
        }
    };
}
function createPokemon() {
    var InMemoryDatabase = /** @class */ (function () {
        function InMemoryDatabase() {
            this.db = {};
            this.beforeAddListeners = createObserver();
            this.afterAddListeners = createObserver();
        }
        InMemoryDatabase.prototype.get = function (id) {
            return this.db[id];
        };
        InMemoryDatabase.prototype.set = function (newValue) {
            this.beforeAddListeners.publish({
                newValue: newValue,
                value: this.db[newValue.id]
            });
            this.db[newValue.id] = newValue;
            this.afterAddListeners.publish({
                value: newValue
            });
        };
        InMemoryDatabase.prototype.onBeforeAdd = function (listener) {
            return this.beforeAddListeners.subscribe(listener);
        };
        InMemoryDatabase.prototype.onAfterAdd = function (listener) {
            return this.afterAddListeners.subscribe(listener);
        };
        InMemoryDatabase.prototype.visit = function (visitor) {
            Object.values(this.db).forEach(visitor);
        };
        InMemoryDatabase.prototype.selectBest = function (scoreStrategy) {
            var found = {
                max: 0,
                item: undefined
            };
            Object.values(this.db).reduce(function (acc, curr) {
                var score = scoreStrategy(curr);
                if (score > acc.max) {
                    acc.max = score;
                    acc.item = curr;
                }
                return acc;
            }, found);
            return found.item;
        };
        InMemoryDatabase.prototype.transform = function (handler) {
            return Object.values(this.db).map(handler);
        };
        InMemoryDatabase.instance = new InMemoryDatabase();
        return InMemoryDatabase;
    }());
    return InMemoryDatabase;
}
var PokemonDB = createPokemon();
var unsubscribeOnBeforeAdd = PokemonDB.instance.onBeforeAdd(function (_a) {
    var newValue = _a.newValue, value = _a.value;
    console.log("on before add", newValue);
    console.log("on before add", value);
});
var unsubscribeOnAfterAdd = PokemonDB.instance.onAfterAdd(function (value) {
    console.log("on after add", value);
});
PokemonDB.instance.set({ id: "pikachu", attack: 100, defence: 100 });
unsubscribeOnBeforeAdd();
PokemonDB.instance.set({ id: "charmander", attack: 110, defence: 200 });
PokemonDB.instance.set({ id: "mewtwo", attack: 1000, defence: 1000 });
PokemonDB.instance.visit(function (p, _i) {
    console.log("pokemon: ", p.id);
});
var temp = PokemonDB.instance.transform(function (p, _i) {
    return {
        _id: p.id,
        _attack: p.attack,
        _defence: p.defence
    };
});
var bestDefence = PokemonDB.instance.selectBest(function (_a) {
    var defence = _a.defence;
    return defence;
});
console.log("best defence", bestDefence);
var bestAttack = PokemonDB.instance.selectBest(function (_a) {
    var attack = _a.attack;
    return attack;
});
console.log("best attack", bestAttack);
