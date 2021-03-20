import React from 'react';
// import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helper/renderWithRouter';
// import pokemons from '../data';

describe('Requirement 03, test the FavoritePokemons.js component', () => {
  it('shows the message `No favorite pokemon found`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
