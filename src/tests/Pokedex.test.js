import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokedex } from '../components';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

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

const np = 'next-pokemon';
const pn = 'pokemon-name';

describe('Teste do Pokemon.js', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const EncounteredPokemons = getByRole('heading', { ariaLevel: 2 });
    expect(EncounteredPokemons).toHaveTextContent('Encountered pokémons');
  });

  it('Teste Botão "Próximo pokémon"', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const btnProx = getByTestId(np);
    expect(btnProx).toHaveTextContent('Próximo pokémon');
  });

  it('Verifica se o botão "Próximo pokemon" funciona', () => {
    let index = 0;
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const btnProx = getByTestId(np);
    const pokName = getByTestId(pn);
    for (index = 0; index < pokemons.length; index += 1) {
      // console.log(pokemons[index].name);;
      if (index === pokemons.length) {
        fireEvent.click(btnProx);
        expect(pokName).toHaveTextContent(pokemons[0].name);
      }
      expect(pokName).toHaveTextContent(pokemons[index].name);
      fireEvent.click(btnProx);
    }
  });

  it('Testa se a Pokedex tem os filtros', () => {
    const pokemonTypes = (
      () => [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))]
    );

    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const filterButtons = getAllByTestId('pokemon-type-button');
    for (let index = 0; index < pokemonTypes().length; index += 1) {
      expect(filterButtons[index]).toHaveTextContent(pokemonTypes()[index]);
    }
  });

  it('Testa se os filtros estão funcionando', () => {
    const pokemonTypes = (
      () => [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))]
    );
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const element = getAllByTestId('pokemonType');
    for (let index = 0; index < pokemonTypes.length; index += 1) {
      fireEvent.click(getByText(pokemonTypes[index]));
      expect(element).toHaveTextContent(pokemonTypes[index]);
    }
  });

  it('Testa se a Pokédex contém um botão pra resetar o filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);

    const btnProx = getByTestId(np);
    const pokName = getByTestId(pn);
    for (let index = 0; index < pokemons.length; index += 1) {
      // console.log(pokemons[index].name);;
      if (index === pokemons.length) {
        fireEvent.click(btnProx);
        expect(pokName).toHaveTextContent(pokemons[0].name);
      }
      expect(pokName).toHaveTextContent(pokemons[index].name);
      fireEvent.click(btnProx);
    }
  });

  it('Testa se o modo selecionado é All', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const btnProx = getByTestId(np);
    const pokName = getByTestId(pn);
    for (let index = 0; index < pokemons.length; index += 1) {
      // console.log(pokemons[index].name);;
      if (index === pokemons.length) {
        fireEvent.click(btnProx);
        expect(pokName).toHaveTextContent(pokemons[0].name);
      }
      expect(pokName).toHaveTextContent(pokemons[index].name);
      fireEvent.click(btnProx);
    }
  });
});
