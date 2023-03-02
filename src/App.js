import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import {Sprites, Icons} from '@pkmn/img';
import {sample, times, uniqueId} from 'lodash';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import RerollButton from './RerollButton';

const TIER_ONE = ["bulbasaur", "charmander", "squirtle", "caterpie", "weedle", "pidgey", "rattata", "spearow", "ekans", "pikachu"]

const rerollShop = () => {
  const pokemonList = [];
  for (let i = 0; i < 3; i++) {
    const randomPokemon = sample(TIER_ONE);
    const pokemonData = Sprites.getPokemon(randomPokemon);
    pokemonData["id"] = uniqueId(randomPokemon)
    pokemonList.push(pokemonData);
  }
  return pokemonList
}

function App() {
  const [shop, setShop] = useState(() => rerollShop());
  const [team, setTeam] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const [turn, setTurn] = useState(1)
  const deselectPokemonRef = useRef(null);
  const handleShopClick = (pokemon) => {
    setSelectedPokemon(pokemon)
  }

  const handleTeamSlotClick = (pokemon) => {
    if (selectedPokemon) {
      setShop((prevShop) => prevShop.filter((poke) => poke.id === selectedPokemon.id));
      setTeam((prevTeam) => [...prevTeam, selectedPokemon])
      setSelectedPokemon(null)
    }
  }

  // const handleDocumentClick = (event) => {
  //   if (deselectPokemonRef.current && !deselectPokemonRef.contains(event.target)) {
  //     setSelectedPokemon(null)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener("click", handleDocumentClick);

  //   return () => {
  //     document.removeEventListener("click", handleDocumentClick)
  //   }
  // }, []);

  return (
    <div className="App">
        <div className="shop-container">
          <div className="shop-pokemon-container">
            {shop.map((pokemon, index) => (
              <img
                key={`${pokemon.id}`}
                src={pokemon.url}
                className={`shop-pokemon ${selectedPokemon && selectedPokemon.id === pokemon.id ? 'selected' : ''}`}
                alt="logo"
                onClick={() => handleShopClick(pokemon)}
              />
            ))}
            {selectedPokemon && (
              <div ref={deselectPokemonRef} className="deselect-pokemon" />
            )}
          </div>
        </div>
        <div className="player-side-container">
          <div className="team-slots-container">
            {
              times(6, (i) => {
                return (
                  <div key={i} className="team-slot" onClick={() => handleTeamSlotClick(i)}>
                    {team[i] && <img src={team[i].url} className="team-pokemon" />}
                  </div>
                )
              })
            }
          </div>
        </div>
        <RerollButton onReroll={() => setShop(rerollShop())} />
        <button className="endturn-button" onClick={() => setTurn(turn + 1)}>End Turn</button>
    </div>
  );
}

export default App;
