import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Tests for the NotFound component', () => {
  it('should show a h2 with the text "Page requested not Found"', () => {
    const { getByRole, getByText } = renderWithRouter(<NotFound />);

    const heading2 = getByRole('heading', {
      level: 2,
    });

    expect(heading2).toBeInTheDocument();
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
})
