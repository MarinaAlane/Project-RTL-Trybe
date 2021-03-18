import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import data from '../data';

describe('Testa o component Pokedex', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const text = getByText(/Encountered pokémons/i);
    expect(text).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon quando o botão é clicado', () => {
    const { queryByText } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextButton = queryByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();

    expect(queryByText(/Pikachu/i)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(/Pikachu/i)).not.toBeInTheDocument();
    expect(queryByText(/Charmander/i)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(/Charmander/i)).not.toBeInTheDocument();
    expect(queryByText(/Caterpie/i)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(/Caterpie/i)).not.toBeInTheDocument();
    expect(queryByText(/Ekans/i)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(/Ekans/i)).not.toBeInTheDocument();
    expect(queryByText(/Alakazam/i)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(/Alakazam/i)).not.toBeInTheDocument();
    expect(queryByText(/Mew/i)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(/Mew/i)).not.toBeInTheDocument();
    expect(queryByText(/Rapidash/i)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(/Rapidash/i)).not.toBeInTheDocument();
    expect(queryByText(/Snorlax/i)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(/Snorlax/i)).not.toBeInTheDocument();
    expect(queryByText(/Dragonair/i)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(/Dragonair/i)).not.toBeInTheDocument();
    expect(queryByText(/Pikachu/i)).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    const { queryAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const renderedPokemon = queryAllByTestId('pokemon-name');
    expect(renderedPokemon.length).toBe(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    const { getByTestId, getByRole } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const dragonButton = getByRole('button', {
      name: (/Dragon/i),
    });
    fireEvent.click(dragonButton);
    console.log(dragonButton.innerHTML);
    const renderedPokemonType = getByTestId('pokemonType');
    expect(renderedPokemonType).toHaveTextContent(dragonButton.innerHTML);
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { queryByText, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const listLength = 9;

    const nextButton = queryByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
    const allButton = queryByText('All');
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);

    for (let index = 0; index < listLength; index += 1) {
      fireEvent.click(nextButton);
    }

    expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  });

  test('Testa se é criado, dinamicamente, um botão de filtro para cada tipo', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    const typesButtons = getAllByTestId('pokemon-type-button');
    expect(types.length).toBe(typesButtons.length);
  });

  test('O botão de Próximo deve ser desabilitado quando tiver um só pokémon.', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextButton = getByRole('button', {
      name: (/Próximo pokémon/i),
    });
    expect(nextButton).toBeInTheDocument();
    const dragonButton = getByRole('button', {
      name: (/Dragon/i),
    });
    expect(dragonButton).toBeInTheDocument();

    fireEvent.click(dragonButton);

    expect(nextButton).toBeDisabled();
  });
});
