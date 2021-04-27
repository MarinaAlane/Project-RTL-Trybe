import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('Testa se renderiza as informações do pokémon', () => {
  const { getByTestId, getByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite={ false }
  />);
  const name = getByTestId('pokemon-name');
  const type = getByTestId('pokemonType');
  const weight = getByTestId('pokemon-weight');
  const image = getByRole('img');
  expect(name).toHaveTextContent(pokemons[0].name);
  expect(type).toHaveTextContent(pokemons[0].type);
  expect(weight).toHaveTextContent(
    `Average weight: ${pokemons[0]
      .averageWeight.value} ${pokemons[0]
      .averageWeight.measurementUnit}`,
  );
  expect(image.src).toBe(pokemons[0].image);
  expect(image.alt).toBe(`${pokemons[0].name} sprite`);
});

test('Testa more details link', () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite={ false }
  />);
  const details = getByRole('link', { name: 'More details' });
  expect(details.href).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
});

test('Testa more details link ao ser clicado', () => {
  const { getByRole, history } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite={ false }
  />);
  const details = getByRole('link', { name: 'More details' });
  fireEvent.click(details);
  expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
});

test('Testa icon favorito pokemon', () => {
  const { getAllByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite
  />);
  const allIcons = getAllByRole('img');
  expect(allIcons[1].src).toBe('http://localhost/star-icon.svg');
  expect(allIcons[1].alt).toBe(`${pokemons[0].name} is marked as favorite`);
});
