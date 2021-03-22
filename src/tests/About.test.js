import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('testes do componente FavoritePokemons.js', () => {
  test('A página deve conter as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const info = getByText(/containing all Pokémons/i);
    const info2 = getByText(/each one of them/i);
    expect(info).toBeInTheDocument();
    expect(info2).toBeInTheDocument();
  });
});
