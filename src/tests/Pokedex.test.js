import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import Pokedex from '../components/Pokedex';
import { pokemonMock, isFavoritePokemonMock } from './__mocks__/pokemonMock';

const POKEMON_NAME = 'pokemon-name';

function renderPokedexSetup(props) {
  const NUMBER_OF_BUTTONS = 7;
  const utils = renderWithRouter(
    <Pokedex
      pokemons={ pokemonMock }
      isPokemonFavoriteById={ isFavoritePokemonMock }
      { ...props }
    />,
  );
  const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
  const pokemonTypesButtons = screen.queryAllByTestId('pokemon-type-button');
  expect(nextPokemonButton).toBeInTheDocument();
  expect(pokemonTypesButtons).toHaveLength(NUMBER_OF_BUTTONS);

  return {
    ...utils,
    nextPokemonButton,
    pokemonTypesButtons,
    dbPokemonFetch: (data) => pokemonMock
      .map((pokemon) => pokemon[data]),
    dbPokemonFetchByType: (type) => pokemonMock
      .filter((pokemon) => pokemon.type === type),
  };
}

test('there are h2 heading text: Encountered pokémons', () => {
  renderPokedexSetup();

  const heading = screen.queryByRole('heading', {
    name: 'Encountered pokémons',
    level: 2,
  });

  expect(heading.textContent).toBe('Encountered pokémons');
});

test('if next pokémon appears when button was pressed and loop over pokemons', () => {
  const { dbPokemonFetch, nextPokemonButton } = renderPokedexSetup();

  dbPokemonFetch('name').forEach((pokemon) => {
    expect(screen.queryByTestId(POKEMON_NAME, { name: pokemon }))
      .toHaveTextContent(pokemon);
    userEvent.click(nextPokemonButton);
  });

  expect(screen.queryByTestId(POKEMON_NAME, { name: 'Pikachu' }))
    .toHaveTextContent('Pikachu');
});

test('view only one pokemonCard when pokemonTypes/nextPokemon button is clicked', () => {
  const { nextPokemonButton, pokemonTypesButtons } = renderPokedexSetup();

  pokemonTypesButtons.forEach((typeButton) => {
    const { disabled: testAnotherPokemon } = nextPokemonButton;
    expect(screen.queryAllByTestId(POKEMON_NAME)).toHaveLength(1);
    if (!testAnotherPokemon) {
      userEvent.click(nextPokemonButton);
      expect(screen.queryAllByTestId(POKEMON_NAME)).toHaveLength(1);
    }
    userEvent.click(typeButton);
  });
});

test('there are a filter fire button that only display filtered fire pokemons', () => {
  const POKEMON_TYPE = 'Psychic';
  const FIRST_POKEMON = 'Alakazam';

  const {
    dbPokemonFetchByType,
    nextPokemonButton,
  } = renderPokedexSetup();

  const pokemonByType = dbPokemonFetchByType(POKEMON_TYPE);
  const pokemonTypeBtn = screen.queryByRole('button', { name: POKEMON_TYPE });
  expect(pokemonTypeBtn).not.toBeNull();

  userEvent.click(pokemonTypeBtn);

  pokemonByType.forEach(({ name: pokeName }) => {
    expect(screen.queryByTestId(POKEMON_NAME, { name: pokeName }))
      .toHaveTextContent(pokeName);
    userEvent.click(nextPokemonButton);
  });
  expect(screen.queryByTestId(POKEMON_NAME, { name: FIRST_POKEMON }))
    .toHaveTextContent(FIRST_POKEMON);
});
