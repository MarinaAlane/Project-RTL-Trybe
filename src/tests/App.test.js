import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWhithRouter from '../components/RenderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  renderWhithRouter(<App />);

  const heading = screen.getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

});

test('Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /', () => {
  const { history } = renderWhithRouter(<App />);
  const { location } = history;
  const { pathname } = location;

  expect(pathname).toBe('/');

});

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
  renderWhithRouter(<App />);

  const home = screen.getByText('Home');
  const about = screen.getByText('About');
  const favoritePokemons = screen.getByText('Favorite Pokémons');

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemons).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
  const { history } = renderWhithRouter(<App />);

  const home = screen.getByText('Home');

  fireEvent.click(home);

  const { location } = history;
  const { pathname } = location;

  expect(pathname).toBe('/');
});

test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {
  const { history } = renderWhithRouter(<App />);

  const about = screen.getByText('About');

  fireEvent.click(about);

  const { location } = history;
  const { pathname } = location;

  expect(pathname).toBe('/about');
});

test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
  const { history } = renderWhithRouter(<App />);

  const favoritePokemons = screen.getByText('Favorite Pokémons');

  fireEvent.click(favoritePokemons);

  const { location } = history;
  const { pathname } = location;

  expect(pathname).toBe('/favorites');
});

test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
  const { history, getByText } = renderWhithRouter(<App />);
  history.push('/noFound');

  expect(getByText('Page requested not found')).toBeInTheDocument();

});
