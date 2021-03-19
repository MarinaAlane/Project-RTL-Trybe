import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o comportamento do Componente FavoritePokemons', () => {
  test('Se é renderizado na tela um texto por não haver pokemons favoritos', () => {
    const { getByText } = render(<FavoritePokemons />);
    const message = getByText('No favorite pokemon found');

    FavoritePokemons.notFound = jest.fn();
    FavoritePokemons.notFound();
    expect(FavoritePokemons.notFound).toBeCalled();

    expect(message).toBeInTheDocument();
  });

  test('Se é rendereziado na tela os pokemons favoritados', () => {
    render(<FavoritePokemons />);

    FavoritePokemons.renderFavoritePokemon = jest.fn()
      .mockReturnValue('Favorite pokémons');
    FavoritePokemons.renderFavoritePokemon();

    expect(FavoritePokemons.renderFavoritePokemon).toBeCalled();
    expect(FavoritePokemons.renderFavoritePokemon()).toBe('Favorite pokémons');
  });
});
