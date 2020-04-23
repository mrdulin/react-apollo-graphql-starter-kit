import MyComponent from '.';
import { shallow } from 'enzyme';
import React from 'react';
import firebase from 'firebase';

describe('61358076', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should pass', async () => {
    const firestoreMock = {
      collection: jest.fn().mockReturnThis(),
      doc: jest.fn().mockReturnThis(),
      set: jest.fn().mockResolvedValueOnce(),
    };
    const clearFieldsSpy = jest.spyOn(MyComponent.prototype, 'clearFields');
    jest.spyOn(firebase, 'firestore').mockImplementationOnce(() => firestoreMock);
    const wrapper = shallow(<MyComponent></MyComponent>);
    await wrapper.instance().saveToFirebase();
    expect(firestoreMock.collection).toBeCalledWith('messages');
    expect(clearFieldsSpy).toBeCalledWith('Your Message have been submitted successfully.');
  });
});
