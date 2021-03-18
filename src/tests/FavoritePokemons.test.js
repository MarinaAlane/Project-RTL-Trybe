import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 3', () => {
  test('correct message if there is no favorite pokemons', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoriteLink = getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);
    const noFavoritesMessage = getByText('No favorite pokemon found');
    expect(noFavoritesMessage).toBeInTheDocument();
  });

  test('show favorite pokemons', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
  });
});
