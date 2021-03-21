import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('verifica se ao clicar no link about, renderiza a página', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  // const pathAbout = History.location;
  // console.log(pathAbout);
});
