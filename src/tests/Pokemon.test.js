import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests regarding Pokemon.js component', () => {
  it('checks if correct structure is displayed', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: 'Dragon' }));
    expect(getByTestId('pokemon-name')).toHaveTextContent('Dragonair');
    expect(getByTestId('pokemonType')).toHaveTextContent('Dragon');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 16.5 kg');
    expect(getByRole('img', { name: 'Dragonair sprite' })).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
  });
});
