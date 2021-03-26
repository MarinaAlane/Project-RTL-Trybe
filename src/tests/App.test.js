import React from 'react';
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
