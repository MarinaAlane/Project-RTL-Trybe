import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Test FavoritePokemons component', () => {
  test('Renders `No favorite pokemon found` if the favorite list is empty', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const notFoundMessage = getByText('No favorite pokemon found');

    expect(notFoundMessage).toBeInTheDocument();
  });

  test('All favorited pokemons cards are rendered', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);

    const moreDetailsLink = getByText(/More details/i);

    userEvent.click(moreDetailsLink);

    const favoritePokemonCheckbox = getByLabelText(/Pokémon favoritado/i);

    userEvent.click(favoritePokemonCheckbox);

    const favoritePokemonLink = getByText(/Favorite Pokémons/i);

    userEvent.click(favoritePokemonLink);

    const favoritedPokemon = getByText(/pikachu/i);

    expect(favoritedPokemon).toBeInTheDocument();
  });

  test('Dont render a pokemon card if it is not favorited', () => {
    const { getByText, getByLabelText, queryByText } = renderWithRouter(<App />);

    const moreDetailsLink = getByText(/More details/i);

    userEvent.click(moreDetailsLink);

    const favoritePokemonCheckbox = getByLabelText(/Pokémon favoritado/i);

    userEvent.click(favoritePokemonCheckbox);

    const favoritePokemonLink = getByText(/Favorite Pokémons/i);

    userEvent.click(favoritePokemonLink);

    const favoritedPokemon = queryByText(/pikachu/i);

    expect(favoritedPokemon).not.toBeInTheDocument();
  });
});
