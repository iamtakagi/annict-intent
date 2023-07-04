import { UserPageScript, UserRecordsPageScript, UserWatchingPageScript } from "../../src/scripts/user";

describe('scripts/user.test.ts', () => {
  test('パスがマッチする', () => {
    expect(new UserPageScript().validatePath(new URL('https://annict.com/@iamtakagi'))).toBe(true);
  });
  test('パスがマッチする', () => {
    expect(new UserRecordsPageScript().validatePath(new URL('https://annict.com/@iamtakagi/records'))).toBe(true);
  });
  test('パスがマッチする', () => {
    expect(new UserWatchingPageScript().validatePath(new URL('https://annict.com/@iamtakagi/watching'))).toBe(true);
  });
});
