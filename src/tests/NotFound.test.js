import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do modulo NotFound', () => {
  it('Testa de a página tem o texto "Not Found"', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const errorMessage = getByText(/Page requested not found/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('Testa se a imagem aparece', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
