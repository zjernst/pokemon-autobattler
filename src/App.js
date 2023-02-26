import React, { useState } from 'react';
import './App.css';
import {Sprites, Icons} from '@pkmn/img';
import {sample, times, uniqueId} from 'lodash';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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
    pokemonData["id"] = uniqueId(randomPokemon)
    pokemonList.push(pokemonData);
  }

  const onDragEnd = (result) => {
    console.log("dragend", result);
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const item = pokemonList[sourceIndex];
    const newList = [...pokemonList];
    newList.splice(sourceIndex, 1);
    newList.splice(destinationIndex, 0, item);
  }

  const onDragStart = (e) => {
    console.log("start", e)
  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className="shop-container">
          <Droppable droppableId="pokeshop" direction="horizontal">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} className="shop-pokemon-container" {...provided.droppableProps}>
                {pokemonList.map((pokemon, index) => (
                  <Draggable key={`shop-${pokemon.id}`} draggableId={`shop-${pokemon.id}`} index={index}>
                    {(provided, snapshot) => (
                      <img
                        ref={provided.innerRef}
                        src={pokemon.url}
                        className="shop-pokemon"
                        alt="logo"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        draggable
                      />
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </div>
        <div className="player-side-container">
          <div className="team-slots-container">
            {
              times(6, (i) => {
                return (
                  <Droppable key={i} droppableId={`slot-${i}`}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} key={i} className="team-slot" {...provided.droppableProps}>
                      </div>
                    )}
                  </Droppable>
                )
              })
            }
          </div>
        </div>
        <RerollButton onReroll={() => setPokemon(sample(TIER_ONE))} />
        <button className="endturn-button" onClick={() => setTurn(turn + 1)}>End Turn</button>
      </DragDropContext>
    </div>
  );
}

export default App;
