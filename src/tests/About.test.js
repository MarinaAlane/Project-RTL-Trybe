import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWhithRouter from '../components/RenderWithRouter';
import { About } from '../components';

test('Teste se a página contém as informações sobre a Pokédex.',
  () => {
    renderWhithRouter(<About />);
    const paragraph = screen.getByText();
  });
test('Teste se a página contém um heading h2 com o texto About Pokédex.',
  () => {});
test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.',
  () => {});
test('Teste se a página contém a seguinte imagem de uma Pokédex.',
  () => {
    const img = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  });
