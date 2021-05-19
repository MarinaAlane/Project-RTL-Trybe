import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const nameDataTestId = 'pokemon-name';

describe('testing the Pokedex component', () => {
  it('Should have a heading', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', { level: 2 });

    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe('H2');
    expect(h2.textContent).toBe('Encountered pokémons');
  });
});

describe('if has a next button', () => {
  it('Should shows the next pokémon, by clicking on the "Próximo Pokémon"', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const nextButton = getByRole('button', { name: 'Próximo pokémon' });
    const pokemonName = getByTestId(nameDataTestId);

    fireEvent.click(nextButton);

    expect(nextButton.textContent).toBe('Próximo pokémon');
    expect(pokemonName.textContent).toBe('Charmander');

    fireEvent.click(nextButton);

    expect(pokemonName.textContent).toBe('Caterpie');
  });
  it('Should shows one pokémon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemon = getAllByTestId(nameDataTestId);

    expect(pokemon.length).toBe(1);
  });
});

describe('if has the filter buttons', () => {
  it('Should have filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    const pokemonsTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    typeButtons.forEach((button, index) => {
      expect(button.textContent).toBe(pokemonsTypes[index]);
    });
  });
  it('Should filter by clicking on a type button', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const { type } = pokemon;
      const filterButton = getByRole('button', { name: type });

      fireEvent.click(filterButton);

      const currentPokemon = getByTestId('pokemonType');
      expect(currentPokemon.textContent).toBe(filterButton.textContent);
    });
  });
  it('Should has a reset filter button', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const resetButton = getByRole('button', { name: 'All' });

    fireEvent.click(resetButton);
    const currentPokemon = getByTestId(nameDataTestId);

    expect(resetButton).toBeInTheDocument();
    expect(currentPokemon.textContent).toBe('Pikachu');
  });
});
