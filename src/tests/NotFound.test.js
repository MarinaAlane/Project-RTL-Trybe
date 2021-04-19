import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do modulo NotFound', () => {
  it('Testa de a página tem o texto "Not Found"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/linkerrado');
    const errorMessage = getByText(/Page requested not found/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('Testa se a imagem aparece', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/linkerrado');
    const image = getByRole('img', { src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif' });
    expect(image).toBeInTheDocument();
  });
});
