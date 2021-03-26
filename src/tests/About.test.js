import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Test About Component', () => {
  it('should render main page', () => {
    const { getByText } = render(<About />);
    const pageTitle = getByText('About Pokédex');
    expect(pageTitle).toBeInTheDocument();
  });
});
