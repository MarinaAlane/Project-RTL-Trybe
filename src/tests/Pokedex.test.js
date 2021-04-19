import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

const pokemonType = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Psychic',
  'Fire',
  'Normal',
  'Dragon',
];

describe('5. Testa o componente <Pokedex.js />', () => {
  it('Testa ha um heading h2 com o texto "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading = getByRole('heading', { level: 2 });
    // console.log(heading.innerHTML);
    const pokedexRegex = /Encountered pokémons/i;
    const isHeading = pokedexRegex.test(heading.innerHTML);

    expect(heading).toBeInTheDocument();
    expect(isHeading).toBe(true);
  });

  it('Testa se mostra o próximo Pokémon se "Próximo pokémon" for clicado', () => {
    // ====== O botão deve conter o texto Próximo pokémon  ====================
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnText = (getByText(/Próximo pokémon/i));
    expect(btnText).toBeInTheDocument();

    //  ======================================================================
    //  O próximo Pokémon da lista deve ser mostrado ao clicar no botão
    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão
    // ========================================================================

    for (let index = 0; index < pokemonType.length; index += 1) {
      userEvent.click(getByText(/Próximo pokémon/i));

      const nextPokemon = getByTestId('pokemonType').innerHTML;

      // console.log(`index ${index}, atual: ${pokemonType[index]}, proximo: ${nextPokemon}`);

      if (index === pokemonType.length - 1) {
        expect(nextPokemon).toBe(pokemonType[0]);
      } else {
        expect(nextPokemon).toBe(pokemonType[index + 1]);
      }
    }
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const pokemons = getAllByTestId('pokemonType');
    console.log(pokemons.length);
    expect(pokemons.length).toBe(1);
  });
});

/*
  describe('Teste se a Pokédex tem os botões de filtro', () => {
    it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {});
    it('O texto do botão deve corresponder ao nome do tipo', () => {});

  });
  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    it('O texto do botão deve ser All', () => {});
    it('A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado', () => {});
    it('Ao carregar a página, o filtro selecionado deverá ser All', () => {});

  });
  describe('Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {

    it('Os botões de filtragem devem ser dinâmicos', () => {});
    it('Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados, sem repetição', () => {});
    it('Deve ser mostrado como opção de filtro, um botão para cada um dos tipos. Além disso, o botão All precisa estar sempre visível', () => {});
  });

  it('O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada de Pokémons tiver um só pokémon', () => {});
  }); */
