import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test App component', () => {
  test('Renders a heading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Renders with links with specific texts', () => {
    const { getByText } = renderWithRouter(<App />);

    const homeLink = getByText(/home/i);
    const aboutLink = getByText(/about/i);
    const favoriteLink = getByText(/Favorite Pokémons/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  test('Home link redirects to the homepage', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const homeLink = getByText(/home/i);

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('About link redirects to the about page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const aboutLink = getByText(/about/i);

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Favorite link redirects to the favorite pokémons page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favoriteLink = getByText(/Favorite Pokémons/i);

    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Redirects to NotFound page when needed', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/notfound');

    expect(history.location.pathname).toBe('/notfound');

    const notfound = getByText(/not found/);
  
    expect(notfound).toBeInTheDocument();
  });
});
