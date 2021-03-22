import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test the FavoritePokemons.js component', () => {
  test('No favorite pokemon found message is displayed', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

/*   test('todos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
  }); */
});
