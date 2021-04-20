import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './History';
import App from '../App';
import pokemons from '../data';

const pokemon = pokemons[0];
const linkDetails = 'More details';

it('render pokemons card info ', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);
  const { averageWeight: { value, measurementUnit } } = pokemon;
  expect(getByTestId('pokemon-name').textContent).toBe(pokemon.name);
  expect(getByTestId('pokemonType').textContent).toBe(pokemon.type);
  expect(getByTestId('pokemon-weight').textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
  expect(getByAltText(`${pokemon.name} sprite`).src).toBe(pokemon.image);
});

it('', () => {});

it('', () => {});

it('', () => {});
