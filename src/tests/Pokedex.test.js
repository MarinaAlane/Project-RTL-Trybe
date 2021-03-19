import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  it(`Teste se página contém um heading h2
      com o texto Encountered pokémons.`, () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading.innerHTML.valueOf()).toBe('Encountered pokémons');
  });
});
