import React from 'react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Test About component', () => {
  test('Renders a heading2 with the text `About Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading2 = getByRole('heading', { level: 2 });

    expect(heading2).toBeInTheDocument();
    expect(heading2).toHaveTextContent(/About Pokédex/);
  });

  test('Render 2 paragraphs with texts about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const paragraph1 = getByText(/simulates a Pokédex/i);
    const paragraph2 = getByText(/filter Pokémons/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Render a specific Pokédex image', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const img = getByAltText('Pokédex');

    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
