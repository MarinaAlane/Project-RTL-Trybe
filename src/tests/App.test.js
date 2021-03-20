import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// ----   its off  ----

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });

describe('Teste se a página principal', () => {
  it('Pokédex é renderizada ao carregar a aplicação no caminho de URL /', () => {
    // access
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Encountered pokémons');

    // test
    expect(home).toBeInTheDocument();
  });
});

describe('Teste de links no menu', () => {
  it('O texto dos 3 links devem ser - Home - About - Favorite Pokémons ', () => {
    // access
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favPokemons = getByText('Favorite Pokémons');

    // test
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemons).toBeInTheDocument();
  });
});
