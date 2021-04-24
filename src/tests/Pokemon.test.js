import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const np = 'next-pokemon';
const pn = 'pokemon-name';

describe('Teste do Pokemon.js', () => {
  it('Testa se o nome correto do pokemon está aparecendo na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent('Pikachu');
  });

  it('Testa se o nome correto do pokemon está aparecendo na tela', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);
    const btnProx = getByTestId(np);
    const pokName = getByTestId(pn);
    for (let index = 0; index < pokemons.length; index += 1) {
      if (index === pokemons.length) {
        fireEvent.click(btnProx);
        expect(pokName).toHaveTextContent(pokemons[0].name);
      }
      expect(pokName).toHaveTextContent(pokemons[index].name);
      fireEvent.click(btnProx);
    }
  });

  it('Testa se o tipo correto está aparecendo na tela', () => {
    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const pokeType = getByTestId('pokemonType');
    const buttonElectric = getByRole('button', { name: 'Electric' });
    const buttonFire = getByRole('button', { name: 'Fire' });
    const buttonBug = getByRole('button', { name: 'Bug' });
    const buttonPoison = getByRole('button', { name: 'Poison' });
    const buttonPsychic = getByRole('button', { name: 'Psychic' });
    const buttonNormal = getByRole('button', { name: 'Normal' });
    const buttonDragon = getByRole('button', { name: 'Dragon' });
    fireEvent.click(buttonElectric);
    expect(pokeType).toHaveTextContent(pokemonTypes[0]);
    fireEvent.click(buttonFire);
    expect(pokeType).toHaveTextContent(pokemonTypes[1]);
    fireEvent.click(buttonBug);
    expect(pokeType).toHaveTextContent(pokemonTypes[2]);
    fireEvent.click(buttonPoison);
    expect(pokeType).toHaveTextContent(pokemonTypes[3]);
    fireEvent.click(buttonPsychic);
    expect(pokeType).toHaveTextContent(pokemonTypes[4]);
    fireEvent.click(buttonNormal);
    expect(pokeType).toHaveTextContent(pokemonTypes[5]);
    fireEvent.click(buttonDragon);
    expect(pokeType).toHaveTextContent(pokemonTypes[6]);
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
