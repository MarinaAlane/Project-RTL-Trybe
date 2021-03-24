import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the Pokemon.js component', () => {
  test('é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);

    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');

    const type = getByTestId('pokemonType');
    expect(type).toHaveTextContent('Electric');

    const weight = getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');

    const img = getByRole('img', { name: /pikachu sprite/i });
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('contém um link de navegação para exibir detalhes', () => {
    const { getByRole } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });

  test('redirecionamento para a página de detalhes de Pokémon e url.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(getByRole('heading', { name: /Pikachu Details/i })).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: /More details/i });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);
    const checkFav = getByRole('checkbox');
    expect(checkFav).toBeInTheDocument();
    userEvent.click(checkFav);
    const starImg = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starImg).toBeInTheDocument();
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
