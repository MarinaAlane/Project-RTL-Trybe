import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {

  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByAltText, getByTestId } = renderWithRouter(<App />);

    const { name, type, averageWeight, image } = pokemons[0];
    const { value, measurementUnit } = averageWeight;

    // 'O nome correto do Pokémon deve ser mostrado na tela'
    const pokemonName = getByTestId(/pokemon-name/i).innerHTML;
    expect(pokemonName).toEqual(name);

    // 'O tipo correto do pokémon deve ser mostrado na tela'
    const pokemonType = getByTestId(/pokemonType/i).innerHTML;
    expect(pokemonType).toEqual(type);

    // 'O peso médio do pokémon deve ser exibido com um texto'
    const weight = getByTestId(/pokemon-weight/i).innerHTML;
    expect(weight).toBe(`Average weight: ${value} ${measurementUnit}`);

    // 'A imagem do Pokémon deve ser exibida'
    const img = getByAltText(`${name} sprite`);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(image);
  });

  /* it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {});

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {});

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {});

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg

    // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido

  }); */
});
