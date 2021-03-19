import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testing <About />', () => {
  it('shold contain information about "Pokédex"', () => {
    render(<About />);
    const aboutPokedex = screen.getByText('About Pokédex');
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('shold contain a heading h2 with the text "About Pokédex"', () => {
    const { getByRole } = render(<About />);
    const headingH2 = getByRole('heading', { name: /About Pokédex/, });
    expect(headingH2).toBeInTheDocument();
  });

  it('shold contain two paragraphs about "Pokédex"', () => {
    const { getAllByText } = render(<About />);
    const pokemonsParagraphs = getAllByText(/Pokémons/);
    expect(pokemonsParagraphs.length).toBe(2);
  });

  it('shold contain a specific image', () => {
    const { getByAltText } = render(<About />);
    const expectedUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByAltText(/Pokédex/);
    expect(image.src).toBe(expectedUrl);
  });

});
