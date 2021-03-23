import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

test('O botão deve conter o texto Próximo pokémon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const next = getByRole('button', { name: /Próximo pokémon/i });
  expect(next).toBeInTheDocument();
});

test('Os próximos Pokémons da lista devem ser mostrados, um a um.', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const next = getByRole('button', { name: /Próximo pokémon/i });
  expect(next).toBeInTheDocument();
  expect(getByText('Pikachu')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Charmander')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Caterpie')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Ekans')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Alakazam')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Mew')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Rapidash')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Snorlax')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Dragonair')).toBeInTheDocument();
});

test('Primeiro Pokémon deve ser mostrado ao clicar no botão', () => {
  const { getByTestId, getByText } = renderWithRouter(<App pokemons={ pokemons } />);

  const dragonair = getByText(/Dragonair/i);
  expect(dragonair).toBeInTheDocument();

  fireEvent.click(getByTestId('next-pokemon'));
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
});

test('Os Pokémons do tipo selecionado do botão de tipo devem estar circulados.', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const eletric = getByRole('button', { name: /Electric/i });
  fireEvent.click(eletric);
  expect(getByText(/Pikachu/i)).toBeInTheDocument();

  const next = getByRole('button', { name: /Próximo pokémon/i });
  const fire = getByRole('button', { name: /Fire/i });
  fireEvent.click(fire);
  expect(getByText(/Charmander/i)).toBeInTheDocument();
  fireEvent.click(next);
  expect(getByText(/Rapidash/i)).toBeInTheDocument();

  const bug = getByRole('button', { name: /Bug/i });
  fireEvent.click(bug);
  expect(getByText(/Caterpie/i)).toBeInTheDocument();

  const poison = getByRole('button', { name: /Poison/i });
  fireEvent.click(poison);
  expect(getByText(/Ekans/i)).toBeInTheDocument();

  const psy = getByRole('button', { name: /Psychic/i });
  fireEvent.click(psy);
  expect(getByText(/Alakazam/i)).toBeInTheDocument();
  fireEvent.click(next);
  expect(getByText(/Mew/i)).toBeInTheDocument();

  const normal = getByRole('button', { name: /Normal/i });
  fireEvent.click(normal);
  expect(getByText(/Snorlax/i)).toBeInTheDocument();

  const dragon = getByRole('button', { name: /Dragon/i });
  fireEvent.click(dragon);
  expect(getByText(/Dragonair/i)).toBeInTheDocument();
});

test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic.', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const type = getByRole('button', { name: /All/i });
  fireEvent.click(type);

  const next = getByRole('button', { name: /Próximo pokémon/i });
  expect(next).toBeInTheDocument();
  expect(getByText('Pikachu')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Charmander')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Caterpie')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Ekans')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Alakazam')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Mew')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Rapidash')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Snorlax')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Dragonair')).toBeInTheDocument();

  fireEvent.click(next);
  expect(getByText('Pikachu')).toBeInTheDocument();
});
