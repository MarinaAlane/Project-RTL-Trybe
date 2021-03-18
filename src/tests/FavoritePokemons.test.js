import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const paragraphs = getByText(/No favorite pokemon found/i);
  expect(paragraphs).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);
  const moreDetails = getByText('More details');
  fireEvent.click(moreDetails);
  const checkBox = getByRole('checkbox');
  fireEvent.click(checkBox);
  const favoritePokemons = getByText('Favorite Pokémons');
  fireEvent.click(favoritePokemons);
  const favPokemons = getByTestId('fav-pokemon');
  expect(favPokemons.children.length).toBe(1);
});

test('', () => {});
