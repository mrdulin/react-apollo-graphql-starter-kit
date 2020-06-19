class ScheduleJob {
  constructor({ id, description, maxConclusionDate, estimateTime }) {
    if (id === undefined) {
      throw new Error('id is undefined');
    }
    if (description === undefined) {
      throw new Error('description is undefined');
    }
    if (maxConclusionDate === undefined) {
      throw new Error('maxConclusionDate is undefined');
    }
    if (estimateTime === undefined) {
      throw new Error('estimateTime is undefined');
    }
    this.id = id;
    this.description = description;
    this.maxConclusionDate = maxConclusionDate;
    this.estimateTime = estimateTime;
  }
}

module.exports = ScheduleJob;
