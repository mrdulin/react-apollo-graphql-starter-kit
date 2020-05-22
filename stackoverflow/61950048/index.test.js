import prompCreator from 'prompt-sync';
import colors from 'colors';

jest.mock(
  'colors',
  () => {
    return {
      bgRed: {
        yellow: jest.fn(),
      },
    };
  },
  { virtual: true },
);

jest.mock(
  'prompt-sync',
  () => {
    const mPrompt = jest.fn();
    return jest.fn(() => mPrompt);
  },
  { virtual: true },
);

describe('61950048', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should pass', () => {
    jest.spyOn(process, 'exit').mockImplementation();
    colors.bgRed.yellow.mockReturnValueOnce('network');
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const mPrompt = prompCreator();
    mPrompt.mockReturnValueOnce('');
    require('./');
    expect(errorSpy).toBeCalledWith('network');
    expect(colors.bgRed.yellow).toBeCalledWith(' You need a password to sign the APK ');
    expect(process.exit).toBeCalledWith(0);
  });
});
