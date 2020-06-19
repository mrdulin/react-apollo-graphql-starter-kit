const ScheduleJob = require('./ScheduleJob.js');

describe('./ScheduleJob parameters validation', () => {
  it('creates a instance with all parameters', () => {
    const mockJob = {
      id: 1,
      description: 'Importação de arquivos de fundos',
      maxConclusionDate: '2019-11-10 12:00:00',
      estimateTime: '2 horas',
    };
    const mockInstance = new ScheduleJob(mockJob);
    expect(mockInstance.id).toBe(1);
    expect(mockInstance.description).toBe('Importação de arquivos de fundos');
    expect(mockInstance.maxConclusionDate).toBe('2019-11-10 12:00:00');
    expect(mockInstance.estimateTime).toBe('2 horas');
  });
  it('Throws error when missing params', () => {
    const mockJob = {
      description: 'Importação de arquivos de fundos',
      maxConclusionDate: '2019-11-10 12:00:00',
      estimateTime: '2 horas',
    };
    expect(() => new ScheduleJob(mockJob)).toThrow(Error);
  });
});
