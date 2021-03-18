import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the <App.js /> component', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('the page is rendered by loading the application at the `/` URL', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const encounteredPokemons = getByText(/encountered pokémons/i);
    expect(encounteredPokemons).toBeInTheDocument();
  });

  describe('The top of the application contains a set of navigation links', () => {
    it('first link must have the text `Home`', () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByText('Home');
      expect(homeLink).toBeInTheDocument();
    });

    it('second link must have the text `About`', () => {
      renderWithRouter(<App />);
      const aboutLink = screen.getByText('About');
      expect(aboutLink).toBeInTheDocument();
    });

    it('third link must have the text `Favorite Pokémons`', () => {
      renderWithRouter(<App />);
      const favoritePokemonsLink = screen.getByText(/Favorite Pokémons/i);
      expect(favoritePokemonsLink).toBeInTheDocument();
    });
  });

  describe('Navigation text', () => {
    it('redirect to the home page by clicking on the Home link', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const homeLink = screen.getByText('Home');
      fireEvent.click(homeLink);
      const encounteredPokemons = getByText(/encountered pokémons/i);
      expect(encounteredPokemons).toBeInTheDocument();
      const pathName = history.location.pathname;
      expect(pathName).toBe('/');
    });

    it('redirect to `/about` page by clicking on the About link', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const aboutLink = screen.getByText('About');
      fireEvent.click(aboutLink);
      const aboutPokedex = getByText(/about pokédex/i);
      expect(aboutPokedex).toBeInTheDocument();
      const pathName = history.location.pathname;
      expect(pathName).toBe('/about');
    });

    it('redirect to `/favorites` page by clicking on the Favorite Pokémons link', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const favoritesLink = screen.getByText(/favorite pokémons/i);
      fireEvent.click(favoritesLink);
      const favoritePokémons = getByText(/Favorite pokémons/);
      expect(favoritePokémons).toBeInTheDocument();
      const pathName = history.location.pathname;
      expect(pathName).toBe('/favorites');
    });

    it('redirect to `not found` page when entering an unknown URL', () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('404');
      const pageNotFound = getByText(/Page requested not found/i);
      expect(pageNotFound).toBeInTheDocument();
    });
  });
});
