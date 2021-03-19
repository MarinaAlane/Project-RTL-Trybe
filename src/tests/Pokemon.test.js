import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 06', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkDetails = getByText('More details');
    fireEvent.click(linkDetails);
  });
});
