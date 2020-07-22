import { MyES6Class } from './';

describe('63011230', () => {
  it('should pass', () => {
    class TestMyES6Class extends MyES6Class {
      public testonconnectionstatechange(event) {
        this.conn.onconnectionstatechange!(event);
      }
      public testonicecandidate(event: RTCPeerConnectionIceEvent) {
        this.conn.onicecandidate!(event);
      }
    }
    const logSpy = jest.spyOn(console, 'log');
    (global as any).RTCPeerConnection = jest.fn();
    const instance = new TestMyES6Class();
    instance.testonconnectionstatechange({} as Event);
    instance.testonicecandidate({} as RTCPeerConnectionIceEvent);
    expect((global as any).RTCPeerConnection).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith('onConnectionStateChange');
    expect(logSpy).toBeCalledWith('onIceCandidate');
  });
});
