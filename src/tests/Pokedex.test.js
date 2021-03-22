import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('Test the Pokedex.js component', () => {
  test('the page contains an h2 heading', () => {
    const { getByRole } = renderWithRouter(<Pokedex />);
    expect(getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });
});
