import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('has nav links', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const home = getAllByRole('link')[0];
  const about = getAllByRole('link')[1];
  const favoritePokemons = getAllByRole('link')[2];

  expect(home.textContent).toBe('Home');
  expect(about.textContent).toBe('About');
  expect(favoritePokemons.textContent).toBe('Favorite Pokémons');
});

test('is redirected to \'Home\' at \'/\'', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const home = getByText('Home');
  fireEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('is redirected to \'About\' at \'/about\'', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const about = getByText('About');
  fireEvent.click(about);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('is redirected to \'Favorite Pokémons\' at \'/favorites\'', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const favoritePokemons = getByText('Favorite Pokémons');
  fireEvent.click(favoritePokemons);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('is redirected to \'Not Found\' at \'unknown path\'', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('/unknown-path');
  const noMatch = getByText('Page requested not found');
  expect(noMatch).toBeInTheDocument();
});
