import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Renderiza um titulo contendo a palavra `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Se há 3 Links com os nomes `Home`, `About` e `Favorite Pokémons`', () => {
  const { getByText } = renderWithRouter(<App />);

  const home = getByText('Home');
  const about = getByText('About');
  const favorite = getByText('Favorite Pokémons');

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});

test('Se os links redirecionam as páginas corretas', () => {
  const { getByText, history } = renderWithRouter(<App />);

  // Home
  fireEvent.click(getByText('Home'));
  const pathHome = history.location.pathname;
  const home = getByText('Encountered pokémons');
  expect(pathHome).toBe('/');
  expect(home).toBeInTheDocument();

  // About
  fireEvent.click(getByText('About'));
  const pathAbout = history.location.pathname;
  const about = getByText('About Pokédex');
  expect(pathAbout).toBe('/about');
  expect(about).toBeInTheDocument();

  // Favorite Pokémons
  fireEvent.click(getByText('Favorite Pokémons'));
  const pathFavorite = history.location.pathname;
  const favorite = getByText('Favorite pokémons');
  expect(pathFavorite).toBe('/favorites');
  expect(favorite).toBeInTheDocument();

  // NotFound
  history.push('/paginanãoexiste');
  const notFound = getByText('Page requested not found');
  expect(notFound).toBeInTheDocument();
});
