import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing About component', () => {
  it('verify if the page have the informations of Pokédex', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/about/i);

    userEvent.click(about);
  });