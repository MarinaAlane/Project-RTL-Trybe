import React from 'react';
import pokemons from '../data'
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import isPokemonFavoriteById from '../App';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { queryByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const headingPokedex = queryByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(headingPokedex).toBeInTheDocument();
});

