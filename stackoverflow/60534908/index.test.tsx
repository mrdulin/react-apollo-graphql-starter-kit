import React from 'react';
import { Simple } from './';
import { render } from '@testing-library/react';

describe('60534908', () => {
  it('should find div element', () => {
    const mProps = { text: 'text passed as prop' };
    const { getByText } = render(<Simple {...mProps} />);
    expect(getByText('text passed as prop')).toBeDefined();
    expect(getByText('test text')).toBeDefined();
  });
});
