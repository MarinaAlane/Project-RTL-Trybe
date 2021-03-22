import React from 'react';
import { fireEvent } from '@testing-library/react';
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
  it('Should have  the links "Home", "About" and "Favorite Pokémons"',() => {
    const { getByText } = renderWithRouter(<App />);
    
    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    const aboutLink = getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = getByText(/Favorite Pokémons/i);
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Should redirect to "/" when clicking the link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  })
})