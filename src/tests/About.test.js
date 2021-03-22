import React from 'react';
import About from '../components/About';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

test('Page contains Pokédex infos', () => {
  renderWithRouter(<About />);
  const about = screen.getByTestId('about-infos');
  expect(about).toBeInTheDocument();
});

test('Page contains a heading `h2` with the text `About Pokédex`.', () => {
  renderWithRouter(<About />);
  const heading = screen.getByRole('heading');
  expect(heading.tagName).toEqual('H2')
  const headingText = screen.getByText('About Pokédex');
  expect(headingText).toBeInTheDocument();
});

test('Page contains two paragraphs with texts about Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByTestId('about-paragraph');
    // console.log(paragraphs);
    expect(paragraphs.length).toEqual(2);
});

test('Page contains especific Pokédex image', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    console.log(image.src);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(`https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`)
});

