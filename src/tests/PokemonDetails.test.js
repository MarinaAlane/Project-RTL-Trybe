import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {

  it('Testa se os detalhes do Pokémon selecionado são mostradas na tela', () => {
    const { queryByText, getByText, getAllByRole, getByTestId } = renderWithRouter(<App />);
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon
    const currentPokemon = getByTestId(/pokemon-name/i).innerHTML;
    const moreDetailsLink = getByText(/More details/i);
    userEvent.click(moreDetailsLink);
    const pokemonDetailsText = getByText(`${currentPokemon} Details`);
    expect(pokemonDetailsText).toBeInTheDocument();

    //console.log(`current: ${currentPokemon}, detail: ${pokemonDetailsText.innerHTML}`);

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado
    // userEvent.click(moreDetailsLink);
    const linkInMoreDetails = queryByText(/More details/i);
    expect(linkInMoreDetails).toBe(null);
    // A seção de detalhes deve conter um heading h2 com o texto Summary
    const heading = getAllByRole('heading', { level: 2 });

    expect(heading[1]).toHaveTextContent('Summary');
    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado
    //let summary = '';
    const summary = pokemons.find(pokemon => pokemon.name === currentPokemon).summary;
    const pokemonSummary = getByText(summary);
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    //Deve existir h2 com o texto Game Locations of <name>
      const { getAllByAltText, getByText, getAllByRole, getByTestId } = renderWithRouter(<App />);

      const currentPokemon = getByTestId(/pokemon-name/i).innerHTML;
      const moreDetailsLink = getByText(/More details/i);
      userEvent.click(moreDetailsLink);

      const heading = getAllByRole('heading', { level: 2 });
      //heading.forEach((value) => console.log(value.innerHTML));
      expect(heading[2]).toHaveTextContent(`Game Locations of ${currentPokemon}`);

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes
    const location = pokemons.find(pokemon => pokemon.name === currentPokemon).foundAt;

    const locationImg = getAllByAltText(`${currentPokemon} location`);

    expect(locationImg.length).toBe(location.length);

    /* it('Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização', () => {

    });

    it('A imagem da localização deve ter um atributo src com a URL da localização', () => {

    });

    it('A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon', () => {

    }); */
  });
/*
  describe('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {

    });

    it('Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos', () => {

    });

    it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {

    });
  }); */
});

