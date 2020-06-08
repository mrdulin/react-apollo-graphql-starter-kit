import React from 'react';
import { mount } from 'enzyme';
import Game from './Game';
import BoardMock from './Board';
import UserMock from './User';

jest.mock('./User', () => {
  const mUser = { pickCards: jest.fn() };
  return jest.fn(() => mUser);
});

jest.mock('./Board', () => jest.fn());

describe('62199135', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should pass', () => {
    const userMock = new UserMock();
    const wrapper = mount(<Game />);
    const gameInstance = wrapper.instance();
    gameInstance.initializeUser('some name');

    expect(BoardMock).toHaveBeenCalledTimes(1);
    expect(UserMock).toHaveBeenCalledWith('some name');
    expect(userMock.pickCards).toHaveBeenCalledTimes(1);
  });
});
