import React from 'react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import isPokemonFavoriteById from '../App';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { queryByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const headingPokedex = queryByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(headingPokedex).toBeInTheDocument();
});

test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  const { queryByRole, getByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const button = queryByRole('button', { name: 'Próximo pokémon' });
  const currentPokemon = getByTestId('pokemon-name');
  expect(currentPokemon).toContainHTML('Pikachu');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Charmander');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Caterpie');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Ekans');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Alakazam');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Mew');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Rapidash');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Snorlax');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Dragonair');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Pikachu');
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { queryAllByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const displayedPokemon = queryAllByTestId('pokemon-name');
  expect(displayedPokemon).toHaveLength(1);
});

test('Teste se a Pokédex tem os botões de filtro.', () => {
  const { getByRole, getByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const electricTypeButton = getByRole('button', { name: 'Electric' });
  const nextPokemonButton = getByRole('button', { name: 'Próximo pokémon' });
  const currentPokemon = getByTestId('pokemon-name');

  userEvent.click(electricTypeButton);
  expect(currentPokemon).toContainHTML('Pikachu');
  expect(nextPokemonButton).toBeDisabled();
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByRole, getByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const allTypeButton = getByRole('button', { name: 'All' });
  const nextPokemonButton = getByRole('button', { name: 'Próximo pokémon' });
  const currentPokemon = getByTestId('pokemon-name');

  userEvent.click(allTypeButton);
  expect(currentPokemon).toContainHTML('Pikachu');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Charmander');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Caterpie');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Ekans');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Alakazam');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Mew');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Rapidash');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Snorlax');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Dragonair');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Pikachu');
});
