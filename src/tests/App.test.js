import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('Teste o componente App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Topo da aplicação contém um os links de navegação', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('É redirecionada para page inicial / ao clicar em Home', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = getByText('Home');
    const linkAbout = getByText('About');
    const linkFavorites = getByText('Favorite Pokémons');
    fireEvent.click(linkHome);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    fireEvent.click(linkAbout);
    expect(getByText('About Pokédex')).toBeInTheDocument();
    fireEvent.click(linkFavorites);
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });
});
