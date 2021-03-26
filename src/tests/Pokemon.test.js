import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import data from '../data';

afterEach(cleanup);

describe('testing Pokemon Component', () => {
  it('pokemons element has correct Name, type weight and image', () => {
    const { getByText, getByTestId, getByAltText } = renderWithRouter(<App />);
    const linkMDetails = getByText(/More Details/i);
    const pokemonName = getByTestId('pokemon-name');
    const dataName = data.find((pokemon) => (pokemon.name === pokemonName.innerHTML));
    const { averageWeight: { value, measurementUnit }, name } = dataName;
    const pokemonsClasses = 8;
    const numbuerOfClicks = Math.floor(Math.random() * pokemonsClasses) + 1;
    for (let i = 0; i <= numbuerOfClicks; i += 1) {
      userEvent.click(linkMDetails);
    }
    expect(pokemonName).toHaveTextContent(name);
    const pokemonWeight = getByTestId('pokemon-weight');
    const weightText = `Average weight: ${value} ${measurementUnit}`;
    expect(pokemonWeight).toHaveTextContent(weightText);
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(dataName.type);
    const pokemonImage = getByAltText(`${dataName.name} sprite`);
    expect(pokemonImage.src).toBe(dataName.image);
  });
});
