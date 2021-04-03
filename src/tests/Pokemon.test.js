import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const dummyArray = Array;
dummyArray.prototype.randomElement = function randomElement() {
  return (this.length) ? this[Math.floor(Math.random() * this.length)] : undefined;
};

describe('Tests Pokemon', () => {
  const HALF = 0.5;
  const isPokemonFavoriteById = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id.toString()] = Math.random() < HALF;
    return acc;
  }, {});
  const thisPokemon = pokemons.randomElement();
});
