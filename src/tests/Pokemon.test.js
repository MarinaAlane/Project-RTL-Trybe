import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste do Pokemon.js', () => {
  it('Testa se o nome correto do pokemon está aparecendo na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent('Pikachu');
  });

  it('Testa se o tipo correto está aparecendo na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toHaveTextContent('Electric');
  });

  it('Verifica se o Average Weight aparece corretamente', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('A imagem do Pokemon deve ser exibida', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const image = getAllByRole('img');
    expect(image[0].src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se o Card do Pokemon contém um link de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByText('More details');
    expect(linkMoreDetails).toBeInTheDocument();
  });

  it('Testa se o link aparece lá em cima ao clicar em More details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkMoreDetails = getByText('More details');
    fireEvent.click(linkMoreDetails);
    const { location } = history;
    const { pathname } = location;
    const pathname1 = pathname;
    expect(pathname1).toBe('/pokemons/25');
  });

  // it('Testa se ao clicar no link de navegacao a pagina é redirecionada', () => {
  //   const { getByText, history } = renderWithRouter(<App />);
  //   const linkMoreDetails = getByText('More details');
  //   fireEvent.click(linkMoreDetails);
  //   const { location } = history;
  //   const { pathname } = location;
  //   const pathname1 = pathname;
  //   expect(pathname1).toBe('/pokemons/25');
  // });

  it('Testa se tem uma estrela no pokemon favoritado', () => {
    const { getByTestId, getByText, getByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(/More Details/i);
    fireEvent.click(linkMoreDetails);
    const checkBox = getByRole('checkbox');
    fireEvent.click(checkBox);
    const star = getByTestId('star-favorite');
    expect(star).toBeInTheDocument();
    expect(star.src).toContain('/star-icon.svg');
    expect(star.alt).toBe('Pikachu is marked as favorite');
  });
});

// it('Testa se mostra os pokemons favoritos', () => {
//   const { getByText, getByRole } = renderWithRouter(<App />);
//   const btnDetails = getByText(/More Details/i);
//   fireEvent.click(btnDetails);
//   const btnFavorite = getByRole('checkbox');
//   fireEvent.click(btnFavorite);
//   const btnFavoritePokemons = getByText(/Favorite Pokémons/i);
//   fireEvent.click(btnFavoritePokemons);
//   const pokemonName = getByText(/pikachu/i);
//   expect(pokemonName).toBeInTheDocument();
// });
