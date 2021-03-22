import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Default test by Trybe, modified to use renderWithRouter', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Test for component App.js', () =>{

})