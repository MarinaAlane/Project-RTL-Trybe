import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testa o componente <About.js />', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutPokedex = getByText(/About Pokédex/i);

    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutPokedex = getByRole('heading', { level: 2 });
    const aboutPokedexText = getByText(/About Pokédex/i);

    expect(aboutPokedex).toBeInTheDocument();
    expect(aboutPokedexText).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const paragraph1 = getByText(/This application simulates a Pokédex,/i);
    const paragraph2 = getByText(/One can filter Pokémons by type,/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByAltText, getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const imgAlt = getByAltText(/Pokédex/i);

    expect(imgAlt).toBeInTheDocument();
    expect(imgAlt.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
