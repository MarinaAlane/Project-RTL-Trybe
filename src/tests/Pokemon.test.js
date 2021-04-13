import React from 'react';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';

const dummyPokemon = {
  id: 65,
  name: 'Alakazam',
  type: 'Psychic',
  averageWeight: {
    value: '48.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Unova Accumula Town',
      map: 'https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
    },
  ],
  summary: 'Closing both its eyes heightens all its other senses',
};

describe('Test \'Pokemon.js\' Component - Requirement 06', () => {
  it('renders a pokemon card with correct parameters', () => {
    const { getByTestId, getAllByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ dummyPokemon }
        isFavorite={ false }
      />,
    );
    const { name, type, averageWeight: { value, measurementUnit }, image } = dummyPokemon;
    expect(getByTestId('pokemon-name').innerHTML).toBe(name);
    expect(getByTestId('pokemonType').innerHTML).toBe(type);
    expect(getByTestId('pokemon-weight').innerHTML)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(getAllByAltText(`${name} sprite`)[0]).toHaveAttribute('src', image);
  });
  it('has navigation link to pokemon datails', () => {
    const { queryByText } = renderWithRouter(
      <Pokemon
        pokemon={ dummyPokemon }
        isFavorite={ false }
      />,
    );
    const { id } = dummyPokemon;
    const details = queryByText('More details');
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', `/pokemons/${id}`);
  });
  it('redirects to pokemon details', () => {
    const { getByTestId, queryByText, getByRole } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name').innerHTML;
    const details = queryByText('More details');
    userEvent.click(details);
    const detailsHeader = getByRole(
      'heading',
      {
        level: 2,
        name: `${name} Details`,
      },
    );
    expect(detailsHeader).toBeInTheDocument();
  });
});
