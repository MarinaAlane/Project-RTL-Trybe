import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';

describe('testing Favorite Pokemons', () => {
  it('should apears No favorite pokemon found', () => {
    render(
      <BrowserRouter>
        <FavoritePokemons />
        ,
      </BrowserRouter>,
    );

    const favorites = screen.queryAllByRole('p', /found/i);

    console.log(favorites);
  });
});
