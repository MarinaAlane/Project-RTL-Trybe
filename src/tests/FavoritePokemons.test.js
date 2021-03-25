import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('testa o component FavoritePokemons.js', () => {
  test('testa se uma determinada mensagem é exibida na tela', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/favorites');
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  test('testa se todos os cards são exibidos', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('/favorites');
    const cards = getAllByRole('div', { name: 'favorite-pokemons' });
    expect(cards).toBeInTheDocument();
  });
});
