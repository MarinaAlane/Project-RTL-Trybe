import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test \'Pokedex.js\' Component - Requirement 05', () => {
  it('has \'h2\' with \'Encountered pokémons\' text', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Encountered pokémons/i);
  });
  it('Changes pokemons after click in \'Próximo pokémon\' button', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nameTestId = 'pokemon-name';
    const button = getByTestId('next-pokemon');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Próximo pokémon');
    const firstPokemon = getByTestId(nameTestId).textContent;
    userEvent.click(button);
    const secondPokemon = getByTestId(nameTestId).textContent;
    expect(firstPokemon).not.toBe(secondPokemon);
    let pokemon;
    const maxClicks = 100;
    let loopComplete = false;
    for (let i = 0; pokemon !== firstPokemon && i < maxClicks; i += 1) {
      userEvent.click(button);
      pokemon = getByTestId(nameTestId).textContent;
      if (pokemon === firstPokemon) {
        loopComplete = true;
      }
    }
    expect(loopComplete).toBe(true);
  });
  it('Only have one pokémon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokémons = getAllByTestId('pokemon-name');
    expect(pokémons.length).toBe(1);
  });
});
