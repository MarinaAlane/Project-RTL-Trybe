import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Test if it renders a pokemon card info', () => {
  it('shows the correct Pokemon name', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const pokemonInfo = [
      getByText(pokemons[0].name),
      getByText(pokemons[0].type),
      getByText(/average weight/i),
      getByAltText(/sprite/i),
    ];
    expect(pokemonInfo[3].src).toContain(`${pokemons[0].image}`);
    pokemonInfo.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('verifies the correct Link pathname', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const detailsLink = getByText(/details/i);
    expect(detailsLink.href).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
  });

  it('tests the correct redirection when the link more details is clicked', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const detailsLink = getByText(/details/i);
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('tests the correct behavior from a favorite pokemon', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const favoriteIcon = getByAltText(/marked as favorite/i);
    expect(favoriteIcon.src).toContain('/star-icon.svg');
    expect(favoriteIcon).toBeInTheDocument();
  });
});
