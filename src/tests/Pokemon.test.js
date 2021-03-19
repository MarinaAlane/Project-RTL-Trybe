import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Teste o componente "Pokemon"', () => {
  const pokemon = pokemons[0];
  const weight = pokemon.averageWeight.value;
  const unit = pokemon.averageWeight.measurementUnit;
  it('Teste se é renderizado um cardde determinado pokémon', async () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
    />);

    const name = screen.getByText(pokemon.name);
    expect(name).toBeInTheDocument();
    const type = screen.getByText(pokemon.type);
    expect(type).toBeInTheDocument();
    const averageWeight = screen.getByText(`Average weight: ${weight} ${unit}`);
    expect(averageWeight).toBeInTheDocument();
    const image = screen.getByAltText(`${pokemon.name} sprite`);
    expect(image.src).toBe(pokemon.image);

    const link = screen.getByText(/more details/i);
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    // await findByText('Summary');

    // const summary = screen.getByText('Summary');
    // expect(summary).toBeInTheDocument();

    // const { pathname } = history.location;
    // expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });
});
