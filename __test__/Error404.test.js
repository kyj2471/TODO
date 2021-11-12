import React from 'react';
import Error404 from '../pages/404.tsx';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

test('Error404', () => {
  const { getByText } = render(<Error404 />);
  expect(getByText('에러')).toBeInTheDocument();
});
