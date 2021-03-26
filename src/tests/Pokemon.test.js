import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('Test the component Pokemon', () => {
  test('Test if Pokemon name is correct', () => {
    const { getAllByTestId, getByRole, getByTestId } = renderWithRouter(<App />);
    const firstPokemonDataFiltered = (type) => pokemons.find(
      (pokemon) => pokemon.type === type,
    );

    const pokemonsTypesOnTheScreen = getAllByTestId('pokemon-type-button')
      .map((htmlElement) => htmlElement.innerHTML);

    pokemonsTypesOnTheScreen.forEach((type) => {
      const pokemonDataToShow = firstPokemonDataFiltered(type);
      const { averageWeight: { value, measurementUnit } } = pokemonDataToShow;
      const averageWeightToShow = `Average weight: ${value} ${measurementUnit}`;

      const typeBtn = getByRole('button', { name: type });
      fireEvent.click(typeBtn);

      const pokemonName = getByTestId('pokemon-name').innerHTML;
      const pokemonType = getByTestId('pokemonType').innerHTML;
      const pokemonWeight = getByTestId('pokemon-weight').innerHTML;
      const pokemonImage = getByRole('img', { name: `${pokemonName} sprite` });

      expect(pokemonName).toBe(pokemonDataToShow.name);
      expect(pokemonType).toBe(pokemonDataToShow.type);
      expect(pokemonWeight).toBe(averageWeightToShow);
      expect(pokemonImage.src).toBe(pokemonDataToShow.image);
    });
  });

  test('Test on the Pokemon card, if there is a link to see more datails', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const moreDetailsLink = getByRole('link', { name: 'More details' });
    const pokemonName = getByTestId('pokemon-name').innerHTML;
    const pokemonId = pokemons.filter((pokemon) => pokemon.name === pokemonName)[0].id;
    expect(moreDetailsLink).toHaveProperty('href', `http://localhost/pokemons/${pokemonId}`);
  });

  test('Test if more details link redirect to details page', () => {
    const { getByRole } = renderWithRouter(<App />);
    const moreDetailsLink = getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetailsLink);
    const detailsText = getByRole('heading', { name: /Details/ });
    expect(detailsText).toBeInTheDocument();
  });
});
