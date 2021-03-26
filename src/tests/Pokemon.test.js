import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, render } from '@testing-library/react';
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
    const pokemonsClasses = 8;
    const numbuerOfClicks = Math.floor(Math.random() * pokemonsClasses) + 1;
    for (let i = 0; i <= numbuerOfClicks; i += 1) {
      userEvent.click(linkMDetails);
    }
    expect(pokemonName).toHaveTextContent(dataName.name);
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${dataName.averageWeight.value} ${dataName.averageWeight.measurementUnit}`);
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(dataName.type);
    const pokemonImage = getByAltText(`${dataName.name} sprite`);
    expect(pokemonImage.src).toBe(dataName.image);
  });
});
      // data1).toBeInTheDocument;
    // expect(dataName.type).toBeInTheDocument;
    // expect(dataName.image).toBeInTheDocument;
    // expect(dataName.averageWeight.value).toBeInTheDocument;
    // expect(dataName.averageWeight.measurementUnit).toBeInTheDocument;
