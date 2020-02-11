import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import axios from 'axios';
import Hello from '.';

jest.mock('axios');

afterEach(cleanup);

it('renders hello correctly', async () => {
  axios.get.mockResolvedValue({
    data: [
      { id: 1, title: 'post one' },
      { id: 2, title: 'post two' },
    ],
  });
  const { getByTestId, asFragment } = render(<Hello />);

  const listNode = await waitForElement(() => getByTestId('list'));
  expect(listNode.children).toHaveLength(2);
  expect(asFragment()).toMatchSnapshot();
});
