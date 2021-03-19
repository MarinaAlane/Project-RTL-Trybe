import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes para o componente <NotFound />', () => {
  it('Verifica se existe um heding h2 com o texto `Page requested not found 😭`', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      level: 2,
      text: /Page requested not found 😭/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica se a página apresenta a imagem do Pikachu', () => {
    renderWithRouter(<NotFound />);

    const path = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(image).toHaveProperty('src', path);
  });
});
