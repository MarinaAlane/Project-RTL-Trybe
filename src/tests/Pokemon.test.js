import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test the `<Pokemon.js />` component', () => {
  const nextPokemon = 'Próximo pokémon';

  it('a card with the information of a certain Pokémon is rendered', () => {
    const { getByTestId, getByText, getByRole } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const { name, type, image } = pokemon;
      const { value, measurementUnit } = pokemon.averageWeight;
      expect(getByTestId('pokemon-name')).toHaveTextContent(name);
      expect(getByTestId('pokemonType')).toHaveTextContent(type);
      expect(getByTestId('pokemon-weight')).toHaveTextContent(value, measurementUnit);
      const pokemonImage = getByRole('img');
      expect(pokemonImage.src).toBe(image);
      expect(pokemonImage.alt).toBe(`${name} sprite`);
      userEvent.click(getByText(nextPokemon));
    });
  });

  it('the Pokémon card indicated contains a navigation link to view details', () => {
    const { getByText } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const { id } = pokemon;
      expect(getByText('More details')).toHaveAttribute('href', `/pokemons/${id}`);
      userEvent.click(getByText(nextPokemon));
    });
  });

  it('there is a star icon on favorite Pokémon', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    userEvent.click(getByText('More details'));
    userEvent.click(getByText(/Pokémon favoritado/i));
    const favoritedIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoritedIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
