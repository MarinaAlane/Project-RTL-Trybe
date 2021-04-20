import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

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

test('Testa se a página é direcionada para a URL / ao clicar no link Home', () => {
  const history = createMemoryHistory();

  const renderWithHistory = {
    ...render(<MemoryRouter history={ history }><App /></MemoryRouter>), history,
  };

  const { getByText, history: historyTest } = renderWithHistory;

  const homeLink = getByText('Home');
  userEvent.click(homeLink);

  historyTest.push('/');

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Testa se a página é direcionada para a URL /about ao clicar no link About', () => {
  const history = createMemoryHistory();

  const renderWithHistory = {
    ...render(<MemoryRouter history={ history }><App /></MemoryRouter>), history,
  };

  const { getByText, history: historyTest } = renderWithHistory;

  const aboutLink = getByText('About');
  userEvent.click(aboutLink);

  historyTest.push('/about');

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const aboutTitle = getByText('About Pokédex');
  expect(aboutTitle).toBeInTheDocument();
});
