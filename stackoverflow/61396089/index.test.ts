import { main } from './';
import { obj } from './obj';

describe('61396089', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should pass', () => {
    const mockDataTable = {
      columns: jest.fn().mockReturnThis(),
      data: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      indexOf: jest.fn().mockReturnValueOnce('fake data'),
    };
    jest.spyOn(obj, 'DataTable').mockImplementationOnce(() => mockDataTable);
    const actual = main();
    expect(actual).toBe('fake data');
    expect(mockDataTable.columns).toBeCalledTimes(1);
    expect(mockDataTable.data).toBeCalledTimes(1);
    expect(mockDataTable.eq).toBeCalledTimes(1);
    expect(mockDataTable.indexOf).toBeCalledTimes(1);
  });
});
