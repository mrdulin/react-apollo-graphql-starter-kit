import React from 'react';
import ReactDOM from 'react-dom';
import App from './';
import { act } from 'react-dom/test-utils';

describe('60113292', () => {
  it.skip('should render 1', () => {
    const el = document.createElement('div');
    ReactDOM.render(<App />, el);
    expect(el.innerHTML).toBe('1');
  });

  it('should render 2', () => {
    const el = document.createElement('div');
    act(() => {
      ReactDOM.render(<App />, el);
    });
    expect(el.innerHTML).toBe('1');
  });
});
