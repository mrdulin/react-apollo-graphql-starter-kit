import { form } from '@myCustomLib/validator';

const validatorMock = {
  fullValidation: jest.fn(),
};

jest.mock(
  '@myCustomLib/validator',
  () => {
    const formMock = {
      particulars: {
        Validator: jest.fn(() => validatorMock),
      },
    };
    return { form: formMock };
  },
  { virtual: true },
);

describe('62949328', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should return true', () => {
    const mError = new Error('error message');
    validatorMock.fullValidation.mockReturnValueOnce(mError);
    const { sampleFunctionIWantToTest } = require('./abc');
    const actual = sampleFunctionIWantToTest();
    expect(actual).toBeTruthy();
    expect(form.particulars.Validator).toBeCalledTimes(1);
  });

  it('should return false', () => {
    validatorMock.fullValidation.mockReturnValueOnce(null);
    const { sampleFunctionIWantToTest } = require('./abc');
    const actual = sampleFunctionIWantToTest();
    expect(actual).toBeFalsy();
    expect(form.particulars.Validator).toBeCalledTimes(1);
  });
});
