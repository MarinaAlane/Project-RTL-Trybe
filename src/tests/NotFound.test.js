import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testing NotFound.js', () => {
  it('test if the page contains a heading whith text "Page requested not found"', () => {
    const { getByRole } = render(<NotFound />);

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Page requested not found 😭');
  });

  it('test if the page contains a "Page requested not found 😭" image', () => {
    const { getByAltText } = render(<NotFound />);

    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
