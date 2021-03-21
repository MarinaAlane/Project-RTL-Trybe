import React from 'react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = pokemons.reduce((acc, { id }) => (
  { ...acc, [id]: false }
), {});

describe('Test <Pokedex /> display', () => {
  it('renders a heading lvl 2 with text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const title = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(title).toBeInTheDocument();
  });

  it('renders one Pokemon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonNameList = getAllByTestId('pokemon-name');

    expect(pokemonNameList).toHaveLength(1);
  });

  // test('next pokemon is shown when clicking "Próximo pokemon" button', () => {
  //   const { getByRole } = renderWithRouter(<Pokedex
  //     pokemons={ pokemons }
  //     isPokemonFavoriteById={ isPokemonFavoriteById }
  //   />);

  //   const nextButton = getByRole('button', { name: //i, })
  // });
});
