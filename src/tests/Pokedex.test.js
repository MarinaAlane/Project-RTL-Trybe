import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Tests Pokedex', () => {
  beforeEach(() => {
    renderedScreen = render(<MemoryRouter><App /></MemoryRouter>);
  });

  test('Tests encountered Pokémons', () => {
    const headings = screen.getByRole('heading', { level: 2 });
    expect(headings).toHaveTextContent('Encountered pokémons');
  });

  test('Tests Next Pokémon Button', () => {
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toHaveTextContent('Próximo pokémon');
  });
});
