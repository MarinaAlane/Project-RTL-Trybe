import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Test <About />', () => {
  const paragraphCount = 2;

  it('renders a heading level 2 written "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: new RegExp('About Pokédex', 'i'),
    });

    expect(heading).toBeInTheDocument();
  });

  test('if page contains two paragraphs', () => {
    const { getAllByRole } = renderWithRouter(<About />);
    const paragraphs = getAllByRole('paragraph');

    expect(paragraphs.length).toBe(paragraphCount);
  });

  it('renders an image of a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img', { name: new RegExp('Pokédex', 'i') });

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
