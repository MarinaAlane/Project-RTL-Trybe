import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing Pokémon Details component', () => {
  it('verify if all informantion are render on the screen', () => {
    const { queryByText, queryAllByRole } = renderWithRouter(<App />);

    const linkDetails = queryByText(/More details/i);
    userEvent.click(linkDetails);

    const searchNameAndDetails = queryByText('Pikachu Details');
    const linkDetailsInDetails = queryByText(/More details/i);
    const pokemonSummary = queryAllByRole('heading', { level: 2 });
    const pokemonDescription = queryByText(/This intelligent Pokémon roasts/i);

    expect(searchNameAndDetails).toBeInTheDocument();
    expect(linkDetailsInDetails).toBeNull();
    expect(pokemonSummary[1].innerHTML).toBe('Summary');
    expect(pokemonDescription).toBeInTheDocument();
  });

  it('verify if is render a section with the maps of pokémon locations', () => {
    const { queryByText, queryAllByRole, queryAllByAltText } = renderWithRouter(<App />);

    const linkDetails = queryByText(/More details/i);
    userEvent.click(linkDetails);

    const headingGameLocations = queryAllByRole('heading', { level: 2 });
    expect(headingGameLocations[2]).toBeInTheDocument();
    expect(headingGameLocations[2].innerHTML).toBe('Game Locations of Pikachu');

    const mapsOfLocationPokemon = queryAllByAltText('Pikachu location');
    const expectedLength = 2;

    expect(mapsOfLocationPokemon.length).toBe(expectedLength);
  });

  it('Check if it is possible to bookmark a pokémon through the details page', () => {
    const { queryByText, queryByAltText } = renderWithRouter(<App />);

    const linkDetails = queryByText(/More details/i);
    userEvent.click(linkDetails);

    const linkFavoritePokemon = queryByText(/Pokémon favoritado?/i);
    expect(linkFavoritePokemon).toBeInTheDocument();

    const iconFavoriteUnSelected = queryByAltText('Pikachu is marked as favorite');
    expect(iconFavoriteUnSelected).toBeNull();

    userEvent.click(linkFavoritePokemon);

    const iconFavoriteIsSelected = queryByAltText('Pikachu is marked as favorite');
    expect(iconFavoriteIsSelected).toBeInTheDocument();
  });
});
