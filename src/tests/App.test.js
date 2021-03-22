import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });

describe('', () => {

  it('Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pokedexHead = getByText(/Encountered pokémons/i);
    const { location } = history;

    expect(pokedexHead).toBeInTheDocument();
    expect(location.pathname).toBe('/');
  })

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação, home, about e favorites', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const linksAvlb = getAllByRole('link');
    const linksLength = 4;

    expect(linksAvlb.length).toBe(linksLength);

    expect(linksAvlb[0]).toBeInTheDocument();
    expect(linksAvlb[0].innerHTML).toBe('Home');

    expect(linksAvlb[1]).toBeInTheDocument();
    expect(linksAvlb[1].innerHTML).toBe('About');

    expect(linksAvlb[2]).toBeInTheDocument();
    expect(linksAvlb[2].innerHTML).toBe('Favorite Pokémons');

    expect(linksAvlb[3]).toBeInTheDocument();
    expect(linksAvlb[3].innerHTML).toBe('More details');
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');

    fireEvent.click(homeLink);

    const { location } = history;

    expect(location.pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');

    fireEvent.click(aboutLink);

    const { location } = history;

    expect(location.pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLinks = getByText('Favorite Pokémons');

    fireEvent.click(favoriteLinks);

    const { location } = history;

    expect(location.pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('urlivalida');

    const notfoundMessage = getByText(/not found/i);

    expect(notfoundMessage).toBeInTheDocument();
  })

  it('')
})
