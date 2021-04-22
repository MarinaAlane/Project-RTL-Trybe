import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Test Component Pokemon', () => {
  it('should have the pokemon card', () => {
    const { getByTestId, getByAltText, getByText, getByLabelText } = renderWithRouter(
      <App />,
    );

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.innerHTML).toBe('Electric');
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    const pokemonImg = getByAltText('Pikachu sprite');
    expect(pokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const pokemonDetails = getByText('More details');
    expect(pokemonDetails.attributes[0].value).toBe('/pokemons/25');
    userEvent.click(pokemonDetails);
    // expect(history.location.pathname).toBe('/pokemons/25');
    const favorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(favorite);
    const favoriteIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
