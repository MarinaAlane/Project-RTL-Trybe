import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Comportamentos do App.', () => {
  it('Renderiza um cabecalho com o texto `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Mostra a Pokédex quando o route for `/`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Testa se App contem um conjunto de links de navegacao', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página inicial, na URL "/" ao clicar no link "Home" da barra de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Testa se a aplicação é redirecionada para a página de "About", ao clicar no link "About" da barra de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Testa se a aplicação é redirecionada para a página de "Pokémons Favoritados", ao clicar no link "Favorite Pokémons" da barra de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
});
