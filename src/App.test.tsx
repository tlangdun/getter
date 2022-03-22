import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders under construction', () => {
  render(<App />);
  const linkElement = screen.getByText(/under construction/i);
  expect(linkElement).toBeInTheDocument();
});