import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('O nome correto do Pokémon deve ser exibido', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const cardPokemon = getByText(/Pikachu/i);
  const next = 'next-pokemon';

  expect(cardPokemon).toBeInTheDocument();
  fireEvent.click(getByTestId(next));

  const charmander = getByText(/Charmander/);
  expect(charmander).toBeInTheDocument();
});

test('O peso médio do pokémon deve ser exibido', () => {
  const { getByTestId } = renderWithRouter(<App />);

  pokemons.forEach((poke) => {
    const valuePokemon = poke.averageWeight.value;
    const measurement = poke.averageWeight.measurementUnit;
    const text = `Average weight: ${valuePokemon} ${measurement}`;
    const next = 'next-pokemon';

    expect(getByTestId('pokemon-weight')).toHaveTextContent(text);
    fireEvent.click(getByTestId(next));
  });
});

test('A imagem do Pokémon deve ser exibida', () => {
  const { getByTestId, getByAltText, getByRole } = renderWithRouter(<App />);

  pokemons.forEach((poke) => {
    const text = `${poke.name} sprite`;
    const next = 'next-pokemon';

    expect(getByAltText(text)).toBeInTheDocument();
    expect(getByRole(/img/i).src).toBe(poke.image);
    fireEvent.click(getByTestId(next));
  });
});

test('A URL deve mudar para /pokemon/<id>, onde <id> é o id do Pokémon', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText('More details'));
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('O ícone deve ser uma imagem e ter atributo alt', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);

  fireEvent.click(getByText(/More details/i));
  fireEvent.click(getByText(/Pokémon favorito?/i));
  const images = getAllByRole('img');
  expect(images[1]).toHaveAttribute('src', '/star-icon.svg');
  expect(images[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
