import multipleVideos from './videos.json';

function hasSectionMultipleVideos(sectionUUID) {
  return multipleVideos.videos.some(({ fields }) => {
    return fields.sectionUUID === sectionUUID;
  });
}

export { hasSectionMultipleVideos };
