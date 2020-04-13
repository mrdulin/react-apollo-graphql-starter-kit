import { downloadReports } from '.';
import { call } from './call';

jest.mock('./call', () => {
  return { call: jest.fn() };
});
window.URL.createObjectURL = jest.fn();
window.Blob = jest.fn();

describe('61167297', () => {
  it('should pass', function () {
    function* mCall() {
      yield 'res';
    }
    const mCallGen = mCall();
    // call.mockImplementation(() => {
    //   const val = mCallGen.next().value;
    //   console.log('val:', val);
    //   return val;
    // });
    // call.mockImplementation(() => {
    //   console.log('call 123');
    //   return mCall;
    // });
    call.mockResolvedValueOnce('res');
    window.Blob.mockReturnValueOnce('mocked blob');
    window.URL.createObjectURL.mockReturnValueOnce('https://github.com/mrdulin');
    const action = { payload: 'payload' };
    const downloadReportsGen = downloadReports(action);
    let val = downloadReportsGen.next();
    while (!val.done) {
      val = downloadReportsGen.next();
    }
    expect(call).toBeCalledWith('report.pdf', 'payload');
    expect(window.URL.createObjectURL).toBeCalledWith(new Blob(['res']));
  });
});
