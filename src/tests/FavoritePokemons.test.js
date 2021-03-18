import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o componente <FavoritePokemons />', () => {
  const favorites = '/favorites';
  test('Se não tiver pokemons favotos a mensagem No favorite pokemon found aparece',
    () => {
      const { history } = renderWithRouter(<App />);

      const faviritePokemon = screen.getByText(/Favorite pokémon/i);
      expect(faviritePokemon).toBeInTheDocument();

      userEvent.click(faviritePokemon);
      const { pathname: favoritePage } = history.location;
      expect(favoritePage).toBe(favorites);

      const noFavoritePokemons = screen.getByText('No favorite pokemon found');
      expect(noFavoritePokemons).toBeInTheDocument();
    });

  test('testa se nenhum pokemon aparese se não favoritado', () => {
    const { history } = renderWithRouter(<App />);

    const faviritePokemon = screen.getByText(/Favorite pokémons/i);
    expect(faviritePokemon).toBeInTheDocument();

    userEvent.click(faviritePokemon);
    const { pathname } = history.location;
    expect(pathname).toBe(favorites);

    const pokeCard = screen.queryByText(/More details/i);
    expect(pokeCard).toBeNull();
  });

  test('testa os pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moredetails = screen.getByText(/More details/);
    expect(moredetails).toBeInTheDocument();

    userEvent.click(moredetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const favorite = screen.getByText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    history.push('/');
    const faviritePokemon = screen.getByText(/Favorite pokémons/i);
    expect(faviritePokemon).toBeInTheDocument();

    userEvent.click(faviritePokemon);
    const { pathname: favoritePath } = history.location;
    expect(favoritePath).toBe(favorites);

    const noFavoritePokemons = screen.queryByText('No favorite pokemon found');
    expect(noFavoritePokemons).toBeNull();

    const pokeCard = screen.getByText(/More details/i);
    expect(pokeCard).toBeInTheDocument();
  });
});
