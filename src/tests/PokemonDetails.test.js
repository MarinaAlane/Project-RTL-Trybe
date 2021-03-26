import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing Pokémon Details component', () => {
  it('verify with all informantion are render on the screen', () => {
    renderWithRouter(<App />);
  });
});
