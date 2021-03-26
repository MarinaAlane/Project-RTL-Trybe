import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela uma mensagem se a pessoa nao tiver pokemons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const notFound = getByText(/No favorite pokemon found/i);

    expect(notFound).toBeInTheDocument();
  });

  /* it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<FavoritePokemons />);

    const favorites = getAllByAltText(/favorite/i);
    console.log(favorites);
  }); */
  // it('', () => {});
});
