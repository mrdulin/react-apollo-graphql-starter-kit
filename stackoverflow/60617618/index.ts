export class SomeClass {
  private MediaPlayerEventEmitter;
  private trackReadySubscription;
  constructor(MediaPlayerEventEmitter) {
    this.MediaPlayerEventEmitter = MediaPlayerEventEmitter;
  }
  onSilentTrackReadyToPlay(callback?: (trackState: string) => void): void {
    this.trackReadySubscription = this.MediaPlayerEventEmitter.addListener('silentTrackReadyToPlay', (trackState) => {
      if (callback) {
        callback(trackState);
      }
    });
  }
}
