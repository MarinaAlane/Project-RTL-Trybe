import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithHistory = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<MemoryRouter history={ history }>{ component }</MemoryRouter>), history,
  };
};

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Testa o carregamento da página principal ao acessar o caminho da URL /', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const title = getByText('Encountered pokémons');
  expect(title).toBeInTheDocument();
});

test('Testa se o topo da aplicação possui um conjunto de links de navegação', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLink = getByText('Home');
  expect(homeLink).toBeInTheDocument();

  const aboutLink = getByText('About');
  expect(aboutLink).toBeInTheDocument();

  const favoriteLink = getByText('Favorite Pokémons');
  expect(favoriteLink).toBeInTheDocument();
});

test('Testa direcionamento para a URL / ao clicar no link Home', () => {
  const { getByText, history } = renderWithHistory(<App />);

  const homeLink = getByText('Home');
  userEvent.click(homeLink);

  historyTest.push('/');

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Testa direcionamento para a URL /about ao clicar no link About', () => {
  const { getByText, history } = renderWithHistory(<App />);

  const aboutLink = getByText('About');
  userEvent.click(aboutLink);

  historyTest.push('/about');

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const aboutTitle = getByText('About Pokédex');
  expect(aboutTitle).toBeInTheDocument();
});

test('Testa direcionamento para a URL /favorites ao clicar em Favorite Pokémons', () => {
  const { getByText, history } = renderWithHistory(<App />);

  const favoriteLink = getByText('Favorite Pokémons');
  userEvent.click(favoriteLink);

  historyTest.push('/favorites');

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');

  const aboutTitle = getByText('Favorite pokémons');
  expect(aboutTitle).toBeInTheDocument();
});
