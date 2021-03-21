import React from 'react';
import { getByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { pokemonType } from '../types';

describe('Pokedex.js', () => {
  test('Verify message o Encountered pokémons', () => {
    renderWithRouter(<App />);

    const messageTitle = screen.getByRole('heading', { level: 2 });
    expect(messageTitle.innerHTML).toBe('Encountered pokémons');
  });

  test('Verify display next pokémon', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[buttons.length - 1].innerHTML).toBe('Próximo pokémon');

    for (let index = 0; index < pokemons.length; index += 1) {
      userEvent.click(buttons[buttons.length - 1]);
    }

    const firstPokemon = screen.getByTestId('pokemon-name');
    expect(firstPokemon.innerHTML).toBe(pokemons[0].name);

    const clickTimes = Math.round(Math.random() * pokemons.length - 1);

    for (let index = 0; index < clickTimes; index += 1) {
      userEvent.click(buttons[buttons.length - 1]);
    }

    const lastPokemon = screen.getByTestId('pokemon-name');
    expect(lastPokemon.innerHTML).toBe(pokemons[clickTimes].name);
  });

  test('Verify one pokémon for time', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('Verify filter buttons', () => {
    renderWithRouter(<App />);

    const pokeType = Math.round(Math.random() * 2);
    const arrayButtons = screen.getAllByTestId('pokemon-type-button');
console.log(pokeType);
    if (pokeType === 0) {
      const buttonFilter = arrayButtons.find((button) => button.innerHTML === 'Fire');
      userEvent.click(buttonFilter);
      const pokemon = screen.getByTestId('pokemonType');
console.log(pokemon.innerHTML);
      expect(pokemon.innerHTML).toBe('Fire');
    } else {
      const buttonFilter = arrayButtons.find((button) => button.innerHTML === 'Psychic');
      userEvent.click(buttonFilter);
      const pokemon = screen.getByTestId('pokemonType');
console.log(pokemon.innerHTML);
      expect(pokemon.innerHTML).toBe('Psychic');
    }
  });

});
