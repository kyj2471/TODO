import React from 'react';
import Loading from '../src/component/Loading';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

test('Error404', () => {
  const { getByText } = render(<Loading />);
  expect(getByText('🧤로딩중🧤')).toBeInTheDocument();
});
