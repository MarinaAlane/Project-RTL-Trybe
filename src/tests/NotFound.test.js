import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa componente <NotFound.js />', () => {
  test('Testa se o componente tem h2 e uma imagem', () => {
    const { history } = renderWithRouter(<NotFound />);

    history.push('/no-page');
    const { pathname } = history.location;
    expect(pathname).toBe('/no-page');

    const imageRole = screen.getByText('😭');
    const heading = screen.getByText('Page requested not found');
    expect(heading && imageRole).toBeInTheDocument();

    const message = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(message);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
