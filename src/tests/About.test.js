import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Tests the About component', () => {
  test('Test if the component has a h2 and the h2 has a text "About Pokédex"',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkAbout = screen.getByText(/About/i);
      expect(linkAbout).toBeInTheDocument();

      userEvent.click(linkAbout);
      const { location } = history;
      const { pathname } = location;
      expect(pathname).toBe('/about');

      const heading = screen.getByRole('heading', {
        level: 2,
      });

      expect(heading).toBeInTheDocument();
      const headingText = screen.getByText(/About Pokédex/i);
      expect(headingText).toBeInTheDocument();

      const image = screen.getByAltText(/Pokédex/i);
      expect(image).toBeInTheDocument();
      expect(image.src).toBe(
        'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
      );
    });
});
