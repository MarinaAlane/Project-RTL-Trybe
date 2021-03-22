import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('Comportamentos do App.', () => {
  test('Renderiza um cabecalho com o texto `Pokédex`', () => {

    const { getByText } = render(<App />);
    /* const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    ); */
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Mostra a Pokédex quando o route for `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});
