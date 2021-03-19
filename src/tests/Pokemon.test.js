import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests regarding Pokemon.js component', () => {
  it('checks if correct structure is displayed', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: 'Dragon' }));
    expect(getByTestId('pokemon-name')).toHaveTextContent('Dragonair');
  });
});
