import { SomeClass } from './';

describe('60617618', () => {
  it('should call callback if exists', () => {
    const mMediaPlayerEventEmitter = {
      addListener: jest.fn().mockImplementationOnce((event, handler) => {
        handler();
      }),
    };
    const ins = new SomeClass(mMediaPlayerEventEmitter);
    const callback = jest.fn();
    ins.onSilentTrackReadyToPlay(callback);
    expect(mMediaPlayerEventEmitter.addListener).toBeCalledWith('silentTrackReadyToPlay', expect.any(Function));
    expect(callback).toBeCalledWith(undefined);
  });

  it('should do nothing if callback does not exist', () => {
    const mMediaPlayerEventEmitter = {
      addListener: jest.fn().mockImplementationOnce((event, handler) => {
        handler();
      }),
    };
    const ins = new SomeClass(mMediaPlayerEventEmitter);
    ins.onSilentTrackReadyToPlay();
    expect(mMediaPlayerEventEmitter.addListener).toBeCalledWith('silentTrackReadyToPlay', expect.any(Function));
  });
});
