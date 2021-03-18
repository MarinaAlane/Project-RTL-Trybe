import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requisito 2', () => {
  test('tests if page contains information about Pokedex', () => {
    const { getByText } = render(<About />);
    const paragraph1 = `This application simulates a Pokédex,
      a digital encyclopedia containing all Pokémons`;
    const paragraph2 = `One can filter Pokémons by type,
    and see more details for each one of them`;
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs[0].textContent).toBe(paragraph1);
    expect(paragraphs[1].textContent).toBe(paragraph2);
  });

  test('tests if page contains information about Pokedex', () => {
    const { getByRole } = render(<About />);
    const title = getByRole('heading', { level: 2 });
    expect(title.textContent).toBe('About Pokédex');
  });
});
