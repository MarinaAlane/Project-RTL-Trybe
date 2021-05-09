import React from 'react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContengt(/pokemon/i);
  });

  test('');
});
