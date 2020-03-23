import SomeComponent from '.';
import { shallow } from 'enzyme';
import React from 'react';

describe('60784579', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should not sticky', () => {
    const mDataHeaderPos = { top: 100 };
    const mHeaderPos = { height: 50 };
    const mHeader = { offsetTop: 100, getBoundingClientRect: jest.fn().mockReturnValueOnce(mHeaderPos) };
    const mDataHeader = { getBoundingClientRect: jest.fn().mockReturnValueOnce(mDataHeaderPos) };
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      switch (selector) {
        case '.productNavLinksContainer':
          return mHeader;
        case '.productNavDataContainer':
          return mDataHeader;
      }
    });
    const wrapper = shallow(<SomeComponent></SomeComponent>);
    const instance = wrapper.instance();
    instance.handleWindowScroll();
    expect(document.querySelector).toBeCalledTimes(2);
    expect(mHeader.getBoundingClientRect).toBeCalledTimes(1);
    expect(mDataHeader.getBoundingClientRect).toBeCalledTimes(1);
    expect(instance.state).toEqual({ sticky: false });
  });

  it('should sticky if pageYOffset greater than offsetTop', () => {
    const mDataHeaderPos = { top: 40 };
    const mHeaderPos = { height: 50 };
    const mHeader = { offsetTop: 100, getBoundingClientRect: jest.fn().mockReturnValueOnce(mHeaderPos) };
    const mDataHeader = { getBoundingClientRect: jest.fn().mockReturnValueOnce(mDataHeaderPos) };
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      switch (selector) {
        case '.productNavLinksContainer':
          return mHeader;
        case '.productNavDataContainer':
          return mDataHeader;
      }
    });
    Object.defineProperty(window, 'pageYOffset', { value: 200 });
    const wrapper = shallow(<SomeComponent></SomeComponent>);
    const instance = wrapper.instance();
    instance.handleWindowScroll();
    expect(document.querySelector).toBeCalledTimes(2);
    expect(mHeader.getBoundingClientRect).toBeCalledTimes(1);
    expect(mDataHeader.getBoundingClientRect).toBeCalledTimes(1);
    expect(instance.state).toEqual({ sticky: true });
  });

  it('should do nothing if header or dataHeader does not exist', () => {
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      switch (selector) {
        case '.productNavLinksContainer':
          return undefined;
        case '.productNavDataContainer':
          return undefined;
      }
    });
    const wrapper = shallow(<SomeComponent></SomeComponent>);
    const instance = wrapper.instance();
    const actual = instance.handleWindowScroll();
    expect(actual).toBeUndefined();
    expect(document.querySelector).toBeCalledTimes(2);
    expect(instance.state).toEqual({ sticky: false });
  });
  it('should do nothing if pageYOffset less than offsetTop', () => {
    const mDataHeaderPos = { top: 40 };
    const mHeaderPos = { height: 50 };
    const mHeader = { offsetTop: 100, getBoundingClientRect: jest.fn().mockReturnValueOnce(mHeaderPos) };
    const mDataHeader = { getBoundingClientRect: jest.fn().mockReturnValueOnce(mDataHeaderPos) };
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      switch (selector) {
        case '.productNavLinksContainer':
          return mHeader;
        case '.productNavDataContainer':
          return mDataHeader;
      }
    });
    Object.defineProperty(window, 'pageYOffset', { value: 80 });
    const wrapper = shallow(<SomeComponent></SomeComponent>);
    const instance = wrapper.instance();
    const actual = instance.handleWindowScroll();
    expect(actual).toBeUndefined();
    expect(document.querySelector).toBeCalledTimes(2);
    expect(mHeader.getBoundingClientRect).toBeCalledTimes(1);
    expect(mDataHeader.getBoundingClientRect).toBeCalledTimes(1);
    expect(instance.state).toEqual({ sticky: false });
  });
});
