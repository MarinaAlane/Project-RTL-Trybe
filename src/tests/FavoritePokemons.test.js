import React from 'react';
import { cleanup, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

afterEach(cleanup);

// arquivo App.test.js pode servir de exemplo
describe('Teste o COmpomente FavoritePokemons', () => {
  it('Se aparece No favorite pokemon found, se não tiver pokémons favoritos', () => {
    const { getByText } = render(<FavoritePokemons />);
    const textFavorite = getByText(/No favorite pokemon found/i);
    expect(textFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  });
});
