import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{ component }</Router>), history,
  };
};

const POKEMON_NAME = 'pokemon-name';

describe('Requisito 5', () => {
  it('Testa se a página possui um h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2 = getByText('Encountered pokémons');
    expect(h2).toBeInTheDocument();
  });

  it('Testa todos os pokemons da lista ao clicar no botão Próximo pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonNext = getByTestId('next-pokemon');
    expect(buttonNext).toHaveTextContent('Próximo pokémon');
    pokemons.forEach((pokemon) => {
      const pokemonName = getByTestId(POKEMON_NAME);
      expect(pokemonName).toHaveTextContent(pokemon.name);
      if (pokemonName === 'Dragonair') {
        userEvent.click(buttonNext);
        const firstPokemon = getByTestId(POKEMON_NAME);
        expect(firstPokemon).toHaveTextContent(pokemon[0].name);
        return;
      }
      userEvent.click(buttonNext);
    });s
  });

  it('Testa se é mostrado um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonsName = getAllByTestId(POKEMON_NAME);
    expect(pokemonsName.length).toBe(1);
  });

});
