import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderpag from '../services/renderpag';

import pokemons from '../data';

describe('Teste do componente Pokedéx', () => {
  test('Parte 1', () => {
    const { getByTestId, getAllByRole } = renderpag(<App />);
    const data = pokemons[0];

    const nome = getByTestId('pokemon-name');
    expect(nome.textContent).toBe(data.name);
    const tipo = getByTestId('pokemonType');
    expect(tipo.textContent).toBe(data.type);
    const peso = getByTestId('pokemon-weight');
    expect(peso.textContent).toBe(`Average weight: ${aveWeight} ${unit}`);
    const img = getAllByRole('img')[0];
    expect(img).toHaveAttribute('src', data.image);
    expect(img).toHaveAttribute('alt', `${data.name} sprite`);
  });

  test('Parte 2', () => {
    const { getByText } = renderpag(<App />);
    const data = pokemons[0];

    const link = getByText('More');
    expect(link).toHaveAttribute('href', `/pokemons/${data.id}`);
  });
  test('Parte 3', () => {
    const { getByText, getAllByRole } = renderpag(<App />);
    const data = pokemons[0];

    const link = getByText('more');
    fireEvent.click(link);
    const head = getAllByRole('heading', { level: 2 })[0];
    expect(head.textContent).toBe(`${data.name} Details`);
  });
  test('Parte 4', () => {
    const { getByText, history } = renderpag(<App />);
    const data = pokemons[0];

    const link = getByText('more');
    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${data.id}`);
  });
  test('Parte 5', () => {
    const { getAllByText, getByLabelText, getByAltText } = renderpag(<App />);
    const { history } = renderpag(<App />);
    const data = pokemons[0];

    const link = getAllByText('more')[0];
    fireEvent.click(link);

    const favorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favorite);
    history.goBack();
    const img = getByAltText(`${data.name} is marked as favorite`);
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img).toHaveAttribute('alt', `${data.name} is marked as favorite`);
  });
});
// código inspirado no código do Natanael, turma 8
