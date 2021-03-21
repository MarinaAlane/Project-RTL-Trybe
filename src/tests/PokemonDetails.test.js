import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('PokemonDetails.js', () => {
  test('Verify  display of pokémon informations details ', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByText('More details');
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    const messageDetails = screen.getAllByRole('heading', { level: 2 });
    expect(messageDetails[0].innerHTML).toBe(`${pokemonName.innerHTML} Details`);

    const navLinks = screen.getAllByRole('link');
    const pokemonLink = navLinks.filter((link) => link.innerHTML !== 'Home'
      && link.innerHTML !== 'About' && link.innerHTML !== 'Favorite Pokémons');
    expect(pokemonLink.length).toBe(0);

    const summaryText = messageDetails.find((summary) => summary.innerHTML === 'Summary');
    expect(summaryText.innerHTML).toBe('Summary');

    const selectPoke = pokemons.find((pokemon) => pokemon.name === pokemonName.innerHTML);
    const summary = screen.getByText(selectPoke.summary);
    expect(summary).toBeInTheDocument();
  });

  
});
