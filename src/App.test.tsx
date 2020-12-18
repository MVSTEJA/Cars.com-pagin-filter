import React from 'react';
import { render, act, screen } from "utils/test-utils";
import App from './App';

test('renders learn react link', () => {
  act(() => {
    render(<App />);
  })
  
  const linkElement = screen.getByText(/Cars.com/i);
  expect(linkElement).toBeInTheDocument();
});
