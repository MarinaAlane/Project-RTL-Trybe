import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

const pokemonNameId = 'pokemon-name';
const pokemonTypeId = 'pokemonType';
const pokemonWeightId = 'pokemon-weight';

describe('Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId(pokemonNameId);
    const pokemonType = getByTestId(pokemonTypeId);
    const pokemonWeight = getByTestId(pokemonWeightId).textContent;
    const pokemonImg = getByAltText(/Pikachu sprite/i);

    const fifteen = 15;
    const three = 3;
    const averageWeight = pokemonWeight.substr(0, fifteen);
    const valueWeight = pokemonWeight.substr(pokemonWeight.indexOf(':') + 2, three);
    const measurementUnit = pokemonWeight.substr(pokemonWeight.indexOf('.') + three, 2);

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBe(`${averageWeight} ${valueWeight} ${measurementUnit}`);
    expect(pokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Testa se o card do Pokémon indicado na Pokédex contém um link de navegação
      para exibir detalhes deste Pokémon.`, () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More Details/i);
    expect(moreDetails.href).toBe('http://localhost/pokemons/25');
  });

  it(`Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
      da aplicação para a página de detalhes de Pokémon.`, () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More Details/i);
    fireEvent.click(moreDetails);

    const details = getByText(/Pikachu Details/i);
    expect(details).toHaveTextContent('Pikachu Details');
  });

  it(`Testa se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id
      do Pokémon cujos detalhes se deseja ver;`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetails = getByText(/More Details/i);
    fireEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByLabelText,
      getByAltText, history } = renderWithRouter(<App />);

    const buttonDragon = getByText(/Dragon/i);
    expect(buttonDragon.type).toBe('button');
    fireEvent.click(buttonDragon);

    const moreDetails = getByText(/More details/i);
    expect(moreDetails.href).toBe('http://localhost/pokemons/148');
    fireEvent.click(moreDetails);

    const favorited = getByLabelText(/Pokémon favoritado?/i);
    expect(favorited.type).toBe('checkbox');
    fireEvent.click(favorited);

    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const star = getByAltText(/Dragonair is marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
