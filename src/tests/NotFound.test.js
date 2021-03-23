import React from 'react';
// import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('NotFound.js', () => {
  test('Teste se pág contém 1 heading h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');

    const { pathname } = history.location;

    expect(pathname).toBe('/not-found');

    const emoji = screen.getByText('😭');
    expect(emoji).toBeInTheDocument();

    const text = screen.getByText('Page requested not found');
    expect(text).toBeInTheDocument();
  });
});
