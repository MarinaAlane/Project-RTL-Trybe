import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('Test the Pokedex.js component', () => {
  test('Render the component', () => {
    render(<Pokedex />);
  });

  test('the page contains an h2 heading', () => {
    const { getByRole } = renderWithRouter(<Pokedex />);
    expect(getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });
  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByRole } = renderWithRouter(<Pokedex />);
    const nextPokemon = getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemon).toBeInTheDocument();
  });
});
