import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4 - Testando componente <NotFound />', () => {
  test('tests if there is a heading with correct text', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFoundText = getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });

  test('tests if the correct image is shown', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imgShown = getByAltText(/Pikachu crying/i);
    expect(imgShown.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
