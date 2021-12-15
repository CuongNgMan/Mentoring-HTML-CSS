import { createPokemon } from './pokemon-factory';
import { Pokemon } from './interfaces/pokemon.interface';

import { MetaPokemon } from './types/meta-pokemon.type';

const PokemonDB = createPokemon<Pokemon>();

const unsubscribeOnBeforeAdd = PokemonDB.instance.onBeforeAdd(({ newValue, value }) => {
  console.log('on before add', newValue, value);
});

const unsubscribeOnAfterAdd = PokemonDB.instance.onAfterAdd((value) => {
  console.log('on after add', value);
});

PokemonDB.instance.set({ id: 'pikachu', attack: 100, defence: 100 });

unsubscribeOnBeforeAdd();
unsubscribeOnAfterAdd();

PokemonDB.instance.set({ id: 'charmander', attack: 110, defence: 200 });

PokemonDB.instance.set({ id: 'mewtwo', attack: 1000, defence: 1000 });

PokemonDB.instance.visit((p, _i) => {
  console.log('pokemon: ', p.id);
});

const temp = PokemonDB.instance.transform<MetaPokemon>((p, _i) => {
  return {
    _id: p.id,
    _attack: p.attack,
    _defence: p.defence,
  };
});
console.log('after transform', temp);

const bestDefence = PokemonDB.instance.selectBest(({ defence }) => defence);
console.log('best defence', bestDefence);

const bestAttack = PokemonDB.instance.selectBest(({ attack }) => attack);
console.log('best attack', bestAttack);
