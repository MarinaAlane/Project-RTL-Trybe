import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{ component }</Router>), history,
  };
};

describe('Requisito 6', () => {
  it('Testa reenderização de um card pokemon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toBeInTheDocument();
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImage = getByRole('img');
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });
});
