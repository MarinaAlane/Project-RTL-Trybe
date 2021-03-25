import React from 'react';
import { fireEvent, getByRole, getByTestId } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokemon.js', () => {
  test('tests whether a card with pokemon information is rendered', () => {
    const { getByTestId, getByAltText, getByRole } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img'.alt)).toBe(`${pokemons[0].name} sprite`);
  });
});
