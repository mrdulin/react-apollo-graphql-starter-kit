import { hasSectionMultipleVideos } from './';

describe('61259592', () => {
  it('should pass', () => {
    const sectionUUID = 1;
    const actual = hasSectionMultipleVideos(sectionUUID);
    expect(actual).toBeTruthy();
  });
});
