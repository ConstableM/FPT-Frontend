import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the component', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
