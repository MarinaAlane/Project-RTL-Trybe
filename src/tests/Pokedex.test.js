import React from 'react';
import { fireEvent } from '@testing-library/react';

import App from '../App'
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('5. Testa o componente <Pokedex.js />', () => {
  it('Testa ha um heading h2 com o texto "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading = getByRole('heading', { level: 2 });
    console.log(heading.innerHTML);
    const pokedexRegex = /Encountered pokémons/i;
    const isHeading = pokedexRegex.test(heading.innerHTML);

    expect(heading).toBeInTheDocument();
    expect(isHeading).toBe(true);
  });

  test('Testa se mostra o próximo Pokémon se "Próximo pokémon" for clicado', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Próximo pokémon/i));

  });
  // test('', () => {});
});
