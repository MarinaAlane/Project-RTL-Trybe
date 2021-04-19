import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do modulo NotFound', () => {
  it('Testa se a página tem o texto "Not Found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const errorMessage = getByRole('heading', { ariaLevel: 2 });
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Page requested not found 😭');
  });

  it('Testa se a imagem aparece', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const image = getAllByRole('img');
    expect(image[1]).toBeInTheDocument();
    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
