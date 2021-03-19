import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render, screen } from '@testing-library/react';
// import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Test the Home link', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const homeLink = getByText(/home/i);
  expect(homeLink).toBeInTheDocument();

  userEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Test the About link', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const aboutLink = getByText(/about/i);
  expect(aboutLink).toBeInTheDocument();

  userEvent.click(aboutLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Test the Favorite link', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const favoriteLink = getByText(/Favorite Pokémons/i);
  expect(favoriteLink).toBeInTheDocument();

  userEvent.click(favoriteLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Test the Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const route = 'xablau';
  history.push(route);

  const notFound = getByText(/not found/i);
  expect(notFound).toBeInTheDocument();
});
