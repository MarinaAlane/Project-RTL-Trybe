import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('MemoryRouter', () => {
  it('Teste se a página principal da Pokédex é renderizada', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/pokémons/);

    expect(home).toBeInTheDocument();
  });
});
