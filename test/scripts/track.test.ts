import { TrackPageScript } from "../../src/scripts/track";

describe('scripts/track.test.ts', () => {
  test('パスがマッチする', () => {
    expect(new TrackPageScript().validatePath(new URL('https://annict.com/track'))).toBe(true);
  });
});
