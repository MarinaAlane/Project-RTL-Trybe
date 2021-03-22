import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

describe('Tests for the About component',() => {
  it('should show a page containing the Pokédex info', () => {
    const { getByText } = renderWithRouter(<About />);

    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  })
});
