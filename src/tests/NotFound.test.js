import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o comportamento do Component NotFound', () => {
  test('Se contem um elemento h2 com o texto `Page requested not found`', () => {
    const { getByRole } = render(<NotFound />);
    const header = getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });

    expect(header).toBeInTheDocument();
  });

  test('Se a URL da imagem renderizada está correta', () => {
    const { getAllByRole } = render(<NotFound />);
    const image = getAllByRole('img');

    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
