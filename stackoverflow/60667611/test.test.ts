import { ComponentsService } from './test';

describe('60667611', () => {
  test('correct array form', async () => {
    const lastag = '';
    const workDir = '.';
    const instance = new ComponentsService();

    const result = await instance.listComponentsDiffer(lastag, workDir);

    const expected = [{ components: 'toto', newVersion: '2', oldVersion: '1' }];
    expect(result).toEqual(expected);
  });
});
