import React from 'react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Requisito 02 - App.js', () => {
  it('Testa se a pág contém informações sobre a "Pokédex".', () => {
    const { getByText } = renderWithRouter(<About />);

    const info = getByText(/This application simulates a Pokédex/i);
    expect(info).toBeInTheDocument();
  });

  it('Testa se a pág contém um heading "h2" com "About Pokédex".', () => {
    const { getByRole } = renderWithRouter(<About />);

    const title = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(title).toBeInTheDocument();
  });

  it('Testa se a pág contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);

    const paragraph1 = getByText(/encyclopedia containing all Pokémons/i);
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = getByText(/One can filter Pokémons by type/i);
    expect(paragraph2).toBeInTheDocument();
  });

  it('Testa se a pág contém a imagem de uma Pokédex com url expecífica', () => {
    const { getByRole } = renderWithRouter(<About />);

    const image = getByRole('img');

    expect(image.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
