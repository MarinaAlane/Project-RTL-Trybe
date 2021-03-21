import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

describe('testes da pagina pokedex', () => {
  it('h2 com texto - Encountered pokémons', () => {
    // access
    const { getByRole } = renderWithRouter(<App />);
    const aga2 = getByRole('heading', { level: 2 });

    // test
    expect(aga2).toHaveTextContent('Encountered pokémons');
  });

  it('botao com texto - All', () => {
    // access
    const { getByTestId } = renderWithRouter(<App />);
    const bottonAll = getByTestId('');

    // test
    expect(bottonAll.innerHTML).toBe('All');
  });

  it('botao com texto - Próximo pokémon ', () => {
    // access
    const { getByTestId } = renderWithRouter(<App />);
    const bottonNext = getByTestId('next-pokemon');

    // test
    expect(bottonNext.innerHTML).toBe('Próximo pokémon');
  });

  it('botos de filtro - ire, Psychic, Electric, Bug, Poison, Dragon e Normal', () => {
    // access
    const { getAllByTestId } = renderWithRouter(<App />);
    const bottonType = getAllByTestId('pokemon-type-button');

    // test
    expect(bottonType[0].innerHTML).toBe('Electric');
    expect(bottonType[1].innerHTML).toBe('Fire');
    expect(bottonType[2].innerHTML).toBe('Bug');
    expect(bottonType[3].innerHTML).toBe('Poison');
    expect(bottonType[4].innerHTML).toBe('Psychic');
    expect(bottonType[5].innerHTML).toBe('Normal');
    expect(bottonType[6].innerHTML).toBe('Dragon');
  });

  it('teste do botao de resetar o filtro', () => {
    // access
    const { getByTestId } = renderWithRouter(<App />);
    const bottonAll = getByTestId('');

    // interact
    fireEvent.click(bottonAll);

    // interact
    // const choiceOfClick = fireEvent.click(bottonAll);

    // test // testa ser foi clicado
    // expect(choiceOfClick).toBe(true);
  });
});
