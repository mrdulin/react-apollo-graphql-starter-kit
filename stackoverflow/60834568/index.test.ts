const a = (page) => {
  test('blabla', () => expect(page).toBe('login'));
};

const page = 'login';

describe('describe 3', () => a(page));
