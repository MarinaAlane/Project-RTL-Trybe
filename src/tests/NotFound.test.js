import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons, NotFound } from '../components';
import App from '../App';
import { render } from 'react-dom';

describe('testing NotFound.js', () => {
  test('tests if it contains a heading level two', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(heading).toBeInTheDocument();
  });

  test('Test if the page shows the image of the link below', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toBe(url);
  });
});
