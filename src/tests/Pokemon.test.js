import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the `<Pokemon.js />` component', () => {
  it('a card with the information of a certain Pokémon is rendered', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('6.0 kg');
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });

  it('the Pokémon card indicated contains a navigation link to view details', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('More details')).toHaveAttribute('href', '/pokemons/25');
  });

  it('there is a star icon on favorite Pokémon', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    userEvent.click(getByText('More details'));
    userEvent.click(getByText(/Pokémon favoritado/i));
    const favoritedIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoritedIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
