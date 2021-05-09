import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Testando o componente PokemonDetails.js', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas.', () => {
    const { getByText, getByRole } = renderWithRouter(
      <PokemonDetails pokemon={ pokemons[0] } />,
    );
    const pokemonName = getByText(`${pokemons[0].name} Details`);
    expect(pokemonName).toBeInTheDocument();

    const section = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(section).toBeInTheDocument();
  });

  test('Teste se na página há uma seção com as localizações do pokémon', () => {
    const { getAllByAltText, getByRole } = renderWithRouter(
      <PokemonDetails pokemon={ pokemons[0] } />,
    );
    const sectionDetails = getByRole('heading', {
      level: 2,
      name: ` Game Locations of ${pokemons[0].name}`,
    });
    expect(sectionDetails).toBeInTheDocument();

    const locations = getAllByAltText('Pikachu Location');
    expect(locations).toBeInTheDocument();
    expect(locations).toHaveAttribute('src', '');
    expect(locations).toHaveAttribute('alt', `${pokemons[0].name} location`);
  });

  test('Teste se pode favoritar um pokémon através da página de detalhes.', () => {
    const { getByRole } = renderWithRouter(
      <PokemonDetails pokemon={ pokemons[0] } />,
    );

    const pokeInput = getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    fireEvent.click(pokeInput);
  });
});
