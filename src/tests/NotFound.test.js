import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

test('has `h2` heading with content `Page requested not found 😭`', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const heading = getByRole('heading', { level: 2 });
  expect(heading.textContent).toBe('Page requested not found 😭');
});

test('shows picture: `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
