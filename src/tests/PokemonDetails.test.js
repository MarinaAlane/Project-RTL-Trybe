import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testing <Pokemon />', () => {
  it('should properly render the Pokemon information', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetailsLink = getByText('More details');
    expect(moreDetailsLink).toBeInTheDocument();
    fireEvent.click(moreDetailsLink);
    const pokemonDetails = getByRole('heading', { name: 'Pikachu Details' });
    expect(pokemonDetails).toBeInTheDocument();
    const summaryText = getByRole('heading', { name: 'Summary' });
    expect(summaryText).toBeInTheDocument();
    const paragraph = getByText(/hard berries/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('should render a section with the pokemon`s location', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const moreDetailsLink = getByText('More details');
    fireEvent.click(moreDetailsLink);
    const pokemonLocation = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(pokemonLocation).toBeInTheDocument();
    const locationList = getAllByAltText('Pikachu location');
    expect(locationList).toHaveLength(2);
    expect(locationList[0].alt).toMatch(/Pikachu location/);
    expect(locationList[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const pikachuFirstLocation = getByText('Kanto Viridian Forest');
    expect(pikachuFirstLocation).toBeInTheDocument();
  });

  it('the user should be able to favorite a pokemon', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const moreDetailsLink = getByText('More details');
    fireEvent.click(moreDetailsLink);
    const pokemonFav = getByLabelText('Pokémon favoritado?');
    fireEvent.click(pokemonFav);
    expect(pokemonFav).toBeChecked();
    fireEvent.click(pokemonFav);
    expect(pokemonFav).not.toBeChecked();
  });
});
