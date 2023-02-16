import React, { useState } from 'react';
import './App.css';
import {Sprites, Icons} from '@pkmn/img';
import {sample} from 'lodash';

import RerollButton from './RerollButton';

const TIER_ONE = ["bulbasaur", "charmander", "squirtle", "caterpie", "weedle", "pidgey", "rattata", "spearow", "ekans", "pikachu"]

function App() {
  const [pokemon, setPokemon] = useState(sample(TIER_ONE));
  const {url, w, h, pixelated} = Sprites.getPokemon(pokemon);

  const [turn, setTurn] = useState(1)

  const pokemonList = [];
  for (let i = 0; i < 3; i++) {
    const randomPokemon = sample(TIER_ONE);
    const pokemonData = Sprites.getPokemon(randomPokemon);
    pokemonList.push(pokemonData);
  }

  return (
    <div className="App">
      <div className="shop-container">
        {pokemonList.map((pokemon, index) => (
            <img key={index} src={pokemon.url} className="App-logo" alt="logo" />
          ))}
      </div>
      <RerollButton onReroll={() => setPokemon(sample(TIER_ONE))} />
      <button className="endturn-button" onClick={() => setTurn(turn + 1)}>End Turn</button>
    </div>
  );
}

export default App;
