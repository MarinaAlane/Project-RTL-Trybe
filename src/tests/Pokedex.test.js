import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{ component }</Router>), history,
  };
};

test('Testa se a página possui um h2 com o texto Encountered pokémons', () => {
  const { getByText } = renderWithRouter(<App />);
  const h2 = getByText('Encountered pokémons');
  expect(h2).toBeInTheDocument();
});
