import React from 'react';

import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';

import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
test('shows the Pokédex when the route is `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
test('there are 3 nav links at the Pokédex', () => {
  const { getByRole } = renderWithRouter(<App />);
  expect(getByRole('link', {
    name: 'Home',
  })).not.toBeNull();
  expect(getByRole('link', {
    name: 'About',
  })).not.toBeNull();
  expect(getByRole('link', {
    name: 'Favorite Pokémons',
  })).not.toBeNull();
});
test('goes to `/` in the pathname when click Home', () => {
  const { getByText, history: { location: { pathname } } } = renderWithRouter(<App />);
  console.log(pathname);
  const homeLink = getByText(/home/i);
  console.log(homeLink);
  fireEvent.click(homeLink);
  expect(pathname).toBe('/');
});
