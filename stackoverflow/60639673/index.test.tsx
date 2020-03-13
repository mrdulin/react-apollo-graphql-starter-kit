import Sample from './';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('60639673', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should display icon', async () => {
    jest.spyOn(localStorage.__proto__, 'getItem').mockReturnValueOnce('1');
    const mProps = { counter: false };
    await act(async () => {
      render(<Sample {...mProps}></Sample>, container);
    });
    expect(container.querySelector('div').textContent).toBe('icon');
    expect(localStorage.__proto__.getItem).toBeCalledWith('some_Id');
    localStorage.__proto__.getItem.mockRestore();
  });

  it('should not display icon', async () => {
    jest.spyOn(localStorage.__proto__, 'getItem').mockReturnValueOnce('');
    const mProps = { counter: true };
    await act(async () => {
      render(<Sample {...mProps}></Sample>, container);
    });
    expect(container.querySelector('div').textContent).toBe('');
    expect(localStorage.__proto__.getItem).toBeCalledWith('some_Id');
    localStorage.__proto__.getItem.mockRestore();
  });
});
