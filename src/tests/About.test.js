import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('Tests the About component', () => {
  const { history } = renderWithRouter(<App />);

  const linkAbout = screen.getByText(/About/i);
  expect(linkAbout).toBeInTheDocument();

  userEvent.click(linkAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const heading2 = screen.getByRole('heading', {
    level: 2,
  });

  expect(heading2).toBeInTheDocument();
  const pokedexHeading2 = screen.getByText(/About Pokédex/i);
  expect(pokedexHeading2).toBeInTheDocument();

  const image = screen.getByAltText(/Pokédex/i);
  expect(image).toBeInTheDocument();
  expect(image.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );

  // const text = (/This application simulates a Pokédex, a digital encyclopedia/);
  // const text2 = (/One can filter Pokémons by type, and see more details for each/);
  // const paragraph = screen.getByText(text);
  // const paragraph2 = screen.getByText(text2);
  // expect(paragraph && paragraph2).toBeInTheDocument();
});
