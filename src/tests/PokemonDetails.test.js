import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testes for the PokemonDetails component', () => {
  it('should show the detailed pokemon info', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const detailsButton = getByRole('link', {
      name: /more details/i,
    });
    expect(detailsButton).toBeInTheDocument();

    fireEvent.click(detailsButton);

    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
    expect(detailsButton).not.toBeInTheDocument();

    const summary = getByRole('heading', {
      name: /Summary/i,
    });

    expect(summary).toBeInTheDocument();

    expect(getByText(/roasts hard berries/i)).toBeInTheDocument();
  });
});
