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

const types = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
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
    expect(pokemons.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
      const { getByRole, getByTestId, getByText } = renderWithRouter(<App />);

      types.forEach((pokemon) => {
        const btn = getByRole('button', {name: pokemon})

        userEvent.click(btn);

        const currentPokemon = getByTestId('pokemonType').innerHTML;
        // O pokemon atual deve ter tipo do botao selecionado
        expect(currentPokemon).toBe(pokemon);
        // O texto do botão deve corresponder ao nome do tipo
        expect(btn.innerHTML).toBe(pokemon);
        
        if (pokemon === 'Psychic' || pokemon === 'Fire') {
          userEvent.click(getByText(/Próximo pokémon/i));
          
          const otherPokemon = getByTestId('pokemonType').innerHTML;
          expect(otherPokemon).toBe(pokemon);
          expect(btn.innerHTML).toBe(pokemon);
        }
      });
    });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByTestId, getByText } = renderWithRouter(<App />);

    // const btnAll = (getByText(/All/i));
    expect(getByText(/All/i)).toBeInTheDocument();

    // userEvent.click(getByText(/Próximo pokémon/i));
    let currentPokemon = getByTestId('pokemonType').innerHTML;
    expect(currentPokemon).toBe('Electric');
    userEvent.click(getByText(/Próximo pokémon/i));
    let otherPokemon = getByTestId('pokemonType').innerHTML;
    expect(otherPokemon).toBe('Fire');

    userEvent.click(getByRole('button', {name: 'All'}));

    // userEvent.click(getByText(/Próximo pokémon/i));
    currentPokemon = getByTestId('pokemonType').innerHTML;
    expect(currentPokemon).toBe('Electric');
    userEvent.click(getByText(/Próximo pokémon/i));
    otherPokemon = getByTestId('pokemonType').innerHTML;
    expect(otherPokemon).toBe('Fire');
  });

  it('Testa se é criado, dinamicamente, um botão de filtro para cada tipo.', () => {
    const { getAllByRole, getByTestId, getByText, getAllByText } = renderWithRouter(<App />);

    expect(getByText(/All/i)).toBeInTheDocument();

    types.forEach((type) => {
      // const typeButton = getAllByText(type);
      const typeButton = getAllByRole('button', {name: type});
      expect(typeButton.length).toBe(1);
    });
  });

  it('Btn Próximo pokémon deve ser disable se a lista tiver um só pokemon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    types.forEach((type) => {
      // if (type !== 'Psychic' || type !== 'Fire') {
      if (type !== 'Fire' && type !== 'Psychic') {
        userEvent.click(getByRole('button', {name: type}));
        expect(getByText(/Próximo pokémon/i)).toBeDisabled();
        console.log(type);
      }
    });
  });
});
