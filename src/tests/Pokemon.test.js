import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const np = 'next-pokemon';
const pn = 'pokemon-name';
const md = 'More details';

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
    const { getByTestId } = renderWithRouter(<App />);
    const pokeType = getByTestId(/pokemonType/i);
    expect(pokeType).toHaveTextContent('Electric');
    // const pokemonTypes = [
    //   'Electric',
    //   'Fire',
    //   'Bug',
    //   'Poison',
    //   'Psychic',
    //   'Normal',
    //   'Dragon',
    // ];
    // const { getByRole, getByTestId } = renderWithRouter(<App />);
    // const pokeType = getByTestId(/pokemonType/i);
    // const buttonElectric = getByRole('button', { name: 'Electric' });
    // const buttonFire = getByRole('button', { name: 'Fire' });
    // const buttonBug = getByRole('button', { name: 'Bug' });
    // const buttonPoison = getByRole('button', { name: 'Poison' });
    // const buttonPsychic = getByRole('button', { name: 'Psychic' });
    // const buttonNormal = getByRole('button', { name: 'Normal' });
    // const buttonDragon = getByRole('button', { name: 'Dragon' });
    // fireEvent.click(buttonElectric);
    // expect(pokeType).toHaveTextContent(pokemonTypes[0]);
    // fireEvent.click(buttonFire);
    // expect(pokeType).toHaveTextContent(pokemonTypes[1]);
    // fireEvent.click(buttonBug);
    // expect(pokeType).toHaveTextContent(pokemonTypes[2]);
    // fireEvent.click(buttonPoison);
    // expect(pokeType).toHaveTextContent(pokemonTypes[3]);
    // fireEvent.click(buttonPsychic);
    // expect(pokeType).toHaveTextContent(pokemonTypes[4]);
    // fireEvent.click(buttonNormal);
    // expect(pokeType).toHaveTextContent(pokemonTypes[5]);
    // fireEvent.click(buttonDragon);
    // expect(pokeType).toHaveTextContent(pokemonTypes[6]);
  });

  it('Verifica se o Average Weight aparece corretamente', () => {
    const { getByTestId, getByRole, queryByText } = renderWithRouter(<App />);
    // const { measurementUnit, value } = averageWeight;
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    const buttonAll = getByRole('button', { name: 'All' });
    const buttonNext = queryByText('Próximo pokémon');
    fireEvent.click(buttonAll);
    pokemons.forEach((elem) => {
      const { averageWeight } = elem;
      const { value, measurementUnit } = averageWeight;
      expect(pokeWeight).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
      fireEvent.click(buttonNext);
    });
  });

  it('A imagem do Pokemon deve ser exibida', () => {
    const { getByRole, queryByText } = renderWithRouter(<App />);
    const imagePrinted = getByRole('img');
    const buttonAll = getByRole('button', { name: 'All' });
    const buttonNext = queryByText('Próximo pokémon');
    fireEvent.click(buttonAll);
    pokemons.forEach((elem) => {
      const { image } = elem;
      expect(imagePrinted.src).toBe(image);
      fireEvent.click(buttonNext);
    });
  });

  it('Testa se o link aparece lá em cima ao clicar em More details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(md);
    fireEvent.click(linkMoreDetails);
    const { location } = history;
    const { pathname } = location;
    const pathname1 = pathname;
    expect(pathname1).toBe('/pokemons/25');
  });
});

describe('Testa se o Card do Pokemon contém um link de navegação', () => {
  it('Testa o botão Electric', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const buttonElectric = getByRole('button', { name: 'Electric' });
    const linkMoreDetails = getByText(md);
    fireEvent.click(buttonElectric);
    fireEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Testa o botão Fire', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const buttonFire = getByRole('button', { name: 'Fire' });
    const linkMoreDetails = getByText(md);
    fireEvent.click(buttonFire);
    fireEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/4');
  });

  it('Testa o botão Bug', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const buttonBug = getByRole('button', { name: 'Bug' });
    const linkMoreDetails = getByText(md);
    fireEvent.click(buttonBug);
    fireEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/10');
  });

  it('Testa o botão Poison', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const buttonPoison = getByRole('button', { name: 'Poison' });
    const linkMoreDetails = getByText(md);
    fireEvent.click(buttonPoison);
    fireEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/23');
  });

  it('Testa o botão Psychic', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const buttonPsychic = getByRole('button', { name: 'Psychic' });
    const linkMoreDetails = getByText(md);
    fireEvent.click(buttonPsychic);
    fireEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/65');
  });

  it('Testa o botão Normal', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const buttonNormal = getByRole('button', { name: 'Normal' });
    const linkMoreDetails = getByText(md);
    fireEvent.click(buttonNormal);
    fireEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/143');
  });

  it('Testa o botão Dragon', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const buttonDragon = getByRole('button', { name: 'Dragon' });
    const linkMoreDetails = getByText(md);
    fireEvent.click(buttonDragon);
    fireEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/148');
  });

  it('Testa o Rapidash', () => {
    const { getByText, getByRole, getByTestId, history } = renderWithRouter(<App />);
    const btnProx = getByTestId(np);
    const buttonFire = getByRole('button', { name: 'Fire' });
    const linkMoreDetails = getByText(md);
    fireEvent.click(buttonFire);
    fireEvent.click(btnProx);
    fireEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/78');
  });
  it('Testa o Mew', () => {
    const { getByText, getByRole, getByTestId, history } = renderWithRouter(<App />);
    const btnProx = getByTestId(np);
    const buttonPsychic = getByRole('button', { name: 'Psychic' });
    const linkMoreDetails = getByText(md);
    fireEvent.click(buttonPsychic);
    fireEvent.click(btnProx);
    fireEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/151');
  });
});
