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

  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2 = getByRole('heading', {
      level: 2, name: 'About Pokédex' });
    expect(h2).toBeInTheDocument();
  });
});
