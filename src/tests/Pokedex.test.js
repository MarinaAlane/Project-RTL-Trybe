import React from 'react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Requirement 05', () => {
  const favoriteByID = {
    4: true,
    10: true,
    23: true,
    25: true,
    65: true,
    78: true,
    143: true,
    148: true,
    151: true,
  };

  it('should have the heading with the text Encountered pokemons', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoriteByID }
    />);
    const pageTitle = getByRole('heading', { name: /encountered pokémons/i });
    expect(pageTitle.innerHTML).toBe('Encountered pokémons');
  });

  it('should have a button called "Próximo pokémon"', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoriteByID }
    />);
    const bttn = getByRole('button', { name: /próximo pokémon/i });
    expect(bttn).toBeInTheDocument();
  });

  // // TO-DO:
  // Teste se é mostrado apenas um Pokémon por vez.
  // Teste se a Pokédex tem os botões de filtro.
  // Teste se a Pokédex contém um botão para resetar o filtro
  // Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.
  // O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada de Pokémons tiver um só pokémon.
});
