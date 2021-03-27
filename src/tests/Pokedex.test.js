import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemonMock, { isFavoritePokemonMock } from './__mocks__/pokemonMock';

test('there are heading h2 text: Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(
    <Pokedex
      pokemons={ pokemonMock }
      isPokemonFavoriteById={ isFavoritePokemonMock }
    />,
  );
  const heading = getByRole('heading', {
    name: 'Encountered pokémons',
    level: 2,
  });
  expect(heading.textContent).toBe('Encountered pokémons');
});
