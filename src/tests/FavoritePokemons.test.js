import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Teste se mostra na tela uma mensagem se nao tiver pokemons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundRegex = /No favorite pokemon found/i;
    const h2 = getByText(notFoundRegex);

    expect(h2).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { queryAllByAltText, getByText } = renderWithRouter(<FavoritePokemons />);

    const notFoundRegex = /No favorite pokemon found/i;
    const h2 = getByText(notFoundRegex);
    const notFound = notFoundRegex.test(h2.innerHTML);
    console.log('not found', notFound);

    if (!notFound) {
      const favorites = queryAllByAltText(/is marked es favorite/i);
      console.log(favorites);
      expect(favorites).toBeDefined();
    }
  });
  // it('', () => {});
});
