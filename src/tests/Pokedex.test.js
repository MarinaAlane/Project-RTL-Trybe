import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('has a heading with text `Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const header = getByRole('heading', { level: 2, name: 'Encountered pokémons' });

  expect(header).toBeInTheDocument();
});

test('shows next Pokémon when it is clicked', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemon = getByTestId('pokemon-name');
  const nextButton = getByTestId('next-pokemon');

  userEvent.click(nextButton);
  expect(pokemon.textContent).toBe('Charmander');

  userEvent.click(nextButton);
  expect(pokemon.textContent).toBe('Caterpie');
});

test('shows one Pokémon at a time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  expect(getAllByTestId('pokemon-name').length).toBe(1);
});

test('has filter buttons', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const buttonNext = getByRole('button', { name: 'Próximo pokémon' });
  const buttonFire = getByRole('button', { name: 'Fire' });
  const buttonPsychic = getByRole('button', { name: 'Psychic' });

  userEvent.click(buttonFire);
  expect(getByText('Charmander')).toBeInTheDocument();
  userEvent.click(buttonNext);
  expect(getByText('Rapidash')).toBeInTheDocument();
  userEvent.click(buttonPsychic);
  expect(getByText('Alakazam')).toBeInTheDocument();
  userEvent.click(buttonNext);
  expect(getByText('Mew')).toBeInTheDocument();
});

test('has filter buttom with text All', () => {
  const { getByRole } = renderWithRouter(<App />);
  const buttonAll = getByRole('button', { name: 'All' });
  expect(buttonAll).toBeInTheDocument();
});

test('has buttons for each Pokémon type', () => {
  const { getByRole } = renderWithRouter(<App />);
  const pokemonsTypes = [
    'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
  ];

  pokemonsTypes.forEach((type) => {
    expect(getByRole('button', { name: type })).toBeInTheDocument();
  });
});

test('Tests if when you have only one pokemon, button must be disabled', () => {
  const { getByRole } = renderWithRouter(<App />);
  const button = getByRole('button', {
    name: 'Electric',
  });
  const buttonNext = getByRole('button', {
    name: 'Próximo pokémon',
  });

  userEvent.click(button);

  expect(buttonNext).toBeDisabled();
});
