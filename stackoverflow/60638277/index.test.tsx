import Content from './';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { GetTotal } from './getTotal';

describe('60638277', () => {
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
  it('should handle year tab', async () => {
    const totalAttendancesSpy = jest.spyOn(GetTotal.prototype, 'totalAttendances').mockReturnValue(100);
    const mProps = { activeTab: 'Year' };
    await act(async () => {
      render(<Content {...mProps}></Content>, container);
    });
    expect(container.querySelector('div').textContent).toBe('100');
    expect(totalAttendancesSpy).toBeCalled();
    totalAttendancesSpy.mockRestore();
  });

  it('should render initial count', async () => {
    const mProps = { activeTab: '' };
    await act(async () => {
      render(<Content {...mProps}></Content>, container);
    });
    expect(container.querySelector('div').textContent).toBe('0');
  });
});
