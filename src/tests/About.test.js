import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

test('has a heading with text `About Pokédex`', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const heading = getByRole('heading', { level: 2 });
  expect(heading.textContent).toBe('About Pokédex');
});

test('has two paragraphs with text', () => {
  const { getAllByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const paragraphs = getAllByText(/Pokémons/i);
  expect(paragraphs.length).toBe(2);
});

test('has a picture with the tested path', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const image = getByAltText('Pokédex');
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
