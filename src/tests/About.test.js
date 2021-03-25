import React from 'react';
// import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('2. Testa o componente <About.js />.', () => {
  it('Testa se a página contém um <h2> com o texto "About Pokédex".', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading = getByRole('heading');
    console.log(heading);

    expect(heading.nodeName).toBe('H2');
    expect(heading.innerHTML).toBe('About Pokédex');
    expect(heading).toBeInTheDocument();
  });
  // it('Testa se a página contém um heading "h2".', () => {});
});
