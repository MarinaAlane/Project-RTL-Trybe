import React from 'react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Test NotFound component', () => {
  test('Render a level 2 heading with "Page requested not found" text', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const heading2 = getByRole('heading', { level: 2 });

    expect(heading2).toBeInTheDocument();
    expect(heading2).toHaveTextContent(/Page requested not found/);
  });

  test('Render a image from a crying Pikachu', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const cryingPikachuImg = getByAltText(/Pikachu crying/i);

    expect(cryingPikachuImg).toBeInTheDocument();
    expect(cryingPikachuImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
