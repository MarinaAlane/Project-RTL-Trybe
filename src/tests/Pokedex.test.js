import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data'

describe('Tests for the Pokedex component', () => {
  it('should have a h2 with the text "Encountered pokémons"', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const heading2 = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })
    expect(heading2).toBeInTheDocument();
  });
});