import React from 'react';
import { render } from '@testing-library/react';
import Aboult from '../components/About';

describe('Bloco de testes para o componente about', () => {
  it('Testa se a página contem as informacoes da Pokédex', () => {
    const { getByText, getByAltText } = render(<Aboult />);
    const aboutTitle = getByText('About Pokédex');
    const aboutParagraph = getByText(/This application simulates a Pokédex/i);
    const aboutImage = getByAltText('Pokédex');

    expect(aboutTitle.textContent).toBe('About Pokédex');
    expect(aboutParagraph.textContent).toMatch(/This application simulates a Pokédex/i);
    expect(aboutImage.alt).toBe('Pokédex');
  });
});
