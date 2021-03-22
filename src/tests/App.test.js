import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderRoute from '../services/renderRoute';
import App from '../App';

describe('testes do  componente App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it(
    'Página principal da Pokédex deve renderizar no caminho de URL / onCLick Home',
    () => {
      const { getByText, history } = renderRoute(<App />);
      const homeRouteTest = getByText(/Home/i);
      userEvent.click(homeRouteTest);
      expect(history.location.pathname).toBe('/');
    },
  );
});
