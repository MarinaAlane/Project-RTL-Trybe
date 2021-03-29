import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const dummyArray = Array;
dummyArray.prototype.randomElement = function randomElement() {
  return (this.length) ? this[Math.floor(Math.random() * this.length)] : undefined;
};

describe('Tests PokemonDetails', () => {
  const HALF = 0.5;
  const isPokemonFavoriteById = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id.toString()] = Math.random() < HALF;
    return acc;
  }, {});
  const onUpdateFavoritePokemons = (pokemonId, checked) => {
    isPokemonFavoriteById[pokemonId] = checked;
  };
  const thisPokemon = pokemons.randomElement();
  const match = {
    params: {
      id: thisPokemon.id.toString(),
    },
  };

  beforeAll(() => {
    render(
      <MemoryRouter>
        <PokemonDetails
          match={ match }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemons }
        />
      </MemoryRouter>,
    );
  });

  test('Tests Pokemon Info', () => {
    expect(screen.getByText(`${thisPokemon.name} Details`)).toBeInTheDocument();
    expect(Array.from(screen.getAllByRole('heading', { level: 2, name: 'Summary' }))
      .some((elemento) => elemento.textContent === 'Summary'))
      .toBeTruthy();
  });
});
