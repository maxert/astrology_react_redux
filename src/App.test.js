import React from 'react';
import { render } from '@testing-library/react';
import Astrology from './Astrology';

test('renders learn react link', () => {
  const { getByText } = render(<Astrology />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
