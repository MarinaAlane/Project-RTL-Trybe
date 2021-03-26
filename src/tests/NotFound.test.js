import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('4. Testa o componente <NotFound.js />', () => {
  it('Testa ha um heading `h2` com o texto `Page requested not found', () => {
    const { getByRole, } = renderWithRouter(<NotFound />);

    const heading = getByRole('heading', { level: 2 });
    const regex = /Page requested not found/i;
    const notFound = regex.test(heading.innerHTML);

    expect(heading).toBeInTheDocument();
    expect(notFound).toBe(true);
  });

  // it('', () => {});
});
