import { removeValuesFromTextAreaEvent } from './';

describe('removeValuesFromTextAreaEvent', () => {
  it('returns a function that calls removeValuesFromTextAreaEvent with rows', () => {
    const removeValuesFromTextArea = jest.fn();
    const rowID = 1;
    const event = { preventDefault: jest.fn() };
    removeValuesFromTextAreaEvent({ removeValuesFromTextArea })(event, rowID);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(removeValuesFromTextArea).toHaveBeenCalledWith({ rowID });
  });
});
