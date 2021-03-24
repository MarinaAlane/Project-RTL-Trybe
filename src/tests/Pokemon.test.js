import React from 'react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import isPokemonFavoriteById from '../App';

test('É renderizado um card com as informações de determinado pokémon.', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  expect(getByTestId('pokemon-name')).toBeDefined();
  expect(getByTestId('pokemonType')).toBeDefined();
  expect(getByTestId('pokemon-weight')).toBeDefined();

  const pokemonImg = getByAltText(/\w+\ssprite/i);
  expect(pokemonImg.src).toBeDefined();
});

test('O card do Pokémon contém um link de nav para exibir detalhes.', () => {
  const { getByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const moreDetailsLink = getByRole('link', { name: 'More details' });
  expect(moreDetailsLink).toBeDefined();
});

test('Ao clicar no link de navegação do Pokémon, é redirecionado para Detalhes', () => {
  const { history, getByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const moreDetailsLink = getByRole('link', { name: 'More details' });
  userEvent.click(moreDetailsLink);
  const { pathname } = history.location;
  expect(pathname).toMatch(/pokemons\/\d{2}/i);
});

test('Existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { queryByAltText } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  expect(queryByAltText(/\w\sis\smarked\sas\sfavorite/i)).toBeDefined();
});
