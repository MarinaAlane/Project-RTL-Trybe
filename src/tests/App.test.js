import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o compoenente App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    renderWithRouter(<App />);

    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Testa se a página principal é renderizada', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa de o header possui Home, About e Favorite pokémon', () => {
    renderWithRouter(<App />);

    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();

    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();

    const faviritePokemon = screen.getByText(/Favorite pokémon/i);
    expect(faviritePokemon).toBeInTheDocument();
  });

  test('Testa se é redirecionada para a home ao clicar em / ', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();

    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se é redirecionada para a abaut ao clicar em /about', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();

    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se é redirecionada para a Favorite pokémon ao clicar em /Favorite pokémon',
    () => {
      const { history } = renderWithRouter(<App />);

      const faviritePokemon = screen.getByText(/Favorite pokémon/i);
      expect(faviritePokemon).toBeInTheDocument();

      userEvent.click(faviritePokemon);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  test('testa se á pagian é direcionada para not found com url inválida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/no-page');
    const { pathname } = history.location;
    expect(pathname).toBe('/no-page');

    const pokeImage = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(pokeImage).toBeInTheDocument();
  });
});
