import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutInfo = getByText(/This application simulates a Pokédex/i);
    expect(aboutInfo).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutHeading = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutHeading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByTestId } = renderWithRouter(<About />);
    const paragraphers = getAllByTestId('about-info');
    expect(paragraphers.length).toBe(2);
  });

  it('este se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imgSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img.src).toContain(imgSrc);
  });
});
