import React from 'react';

import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const titleApp = getByText(/Pokédex/i);
  expect(titleApp).toBeInTheDocument();
});
