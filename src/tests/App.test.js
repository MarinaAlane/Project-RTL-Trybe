import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { history } = renderWithRouter(<App />);

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
  expect(getByText('Encountered pokémons')).toBeInTheDocument();

  const linkAbout = screen.getByText(/About/i);
  expect(linkAbout).toBeInTheDocument();
});
