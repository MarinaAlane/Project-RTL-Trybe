import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Test the About.js component', () => {
  test('the page contains an heading h2 with the text `About Pokédex`.', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    })).toBeInTheDocument();
  });

  test('the page contains the exact image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img', { name: /Pokédex/i });
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  test('the page contains two paragraphs', () => {
    const { getByTestId } = renderWithRouter(<About />);
    const paragraphOne = getByTestId('p-one');
    expect(paragraphOne).toBeInTheDocument();
    const paragraphTwo = getByTestId('p-two');
    expect(paragraphTwo).toBeInTheDocument();
  });
});
