import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Componente NotFound.js', () => {
  it('A página deve ter um heading h2 com o texto encountered pokemons',
    () => {
    // acessa o elemento
      renderWithRouter(<NotFound />);
      const notFoundText = screen.getByText('Page requested not found', {
        level: 2,
        name: /Page requested not found 😭/i,
      });
      // faça o teste
      expect(notFoundText).toBeInTheDocument();
    });
});
