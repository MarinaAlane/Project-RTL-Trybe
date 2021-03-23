import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test Pokedex component', () => {
  test('Renders the title `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading2 = getByRole('heading', { level: 2 });

    expect(heading2).toBeInTheDocument();
    expect(heading2).toHaveTextContent(/Encountered pokémons/);
  });

  test('Show the next pokemon when the button `Próximo pokémon` is clicked', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const button = getByRole('button', { name: 'Próximo pokémon' });

    userEvent.click(button);

    const charmander = getByTestId('pokemon-name');

    expect(charmander).toBeInTheDocument();
    expect(charmander).toHaveTextContent('Charmander');
  });

  test('Only one pokemon is shown', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const pokemon = getAllByTestId('pokemon-name');

    expect(pokemon).toHaveLength(1);
  });

  test('The filter buttons are working', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const button = getByRole('button', { name: 'Fire' });

    userEvent.click(button);

    const pokemonType = getByTestId('pokemonType');

    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Fire');
  });

  test('The reset button is working', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const button = getByRole('button', { name: 'All' });

    userEvent.click(button);

    const pokemonType = getByTestId('pokemonType');

    expect(button).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
  });

  it('The filter buttons are dynamic created', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);

    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButtons = getAllByTestId('pokemon-type-button');
    const resetButton = getByRole('button', { name: 'All' });

    expect(resetButton).toBeInTheDocument();
    typeButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(types[index]);
    });
  });

  test('The button `Proximo Pokemon` is disabled if there is only 1 pokemon', () => {
    const { getByRole } = renderWithRouter(<App />);

    const typeButton = getByRole('button', { name: 'Electric' });
    const nextPokemonButton = getByRole('button', { name: 'Próximo pokémon' });

    userEvent.click(typeButton);

    expect(nextPokemonButton).toBeInTheDocument();
    expect(nextPokemonButton).toBeDisabled();
  });
});
