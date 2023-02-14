import React, { useState } from 'react';
import './App.css';
import {Sprites, Icons} from '@pkmn/img';
import {sample} from 'lodash';

import RerollButton from './RerollButton';

const TIER_ONE = ["bulbasaur", "charmander", "squirtle", "caterpie", "weedle", "pidgey", "rattata", "spearow", "ekans", "pikachu"]

function App() {
  const [pokemon, setPokemon] = useState(sample(TIER_ONE));
  const {url, w, h, pixelated} = Sprites.getPokemon(pokemon);
  return (
    <div className="App">
      <header className="App-header">
        <img src={url} className="App-logo" alt="logo" />
      </header>
      <RerollButton onReroll={() => setPokemon(sample(TIER_ONE))} />
    </div>
  );
}

export default App;
