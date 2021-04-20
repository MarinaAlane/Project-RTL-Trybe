import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
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
})