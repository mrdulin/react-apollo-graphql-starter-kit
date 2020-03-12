import ContactBox from './';

const whenStable = () => new Promise((resolve) => setTimeout(resolve));

describe('60403489', () => {
  it('should add email', async () => {
    const mResponse = { json: jest.fn().mockResolvedValueOnce({}) };
    const mFetch = jest.fn().mockResolvedValueOnce(mResponse);
    (global as any).fetch = mFetch;
    const setStateSpy = jest.spyOn(ContactBox.prototype, 'setState').mockReturnValueOnce();
    const mEvent = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
    ContactBox.prototype.emailCaptureRef = { current: { value: 'example@gmail.com' } };
    ContactBox.prototype.addEmail(mEvent);
    await whenStable();
    expect(mFetch).toBeCalledWith('https://somedomain.com/newsletter/sign_up', {
      method: 'POST',
      body: JSON.stringify({ _method: 'POST', email: 'example@gmail.com' }),
    });
    expect(mResponse.json).toBeCalledTimes(1);
    expect(setStateSpy).toBeCalledWith({ email_box_used: true });
  });
});
