import { TimelinePageScript } from "../../src/scripts/timeline";

describe('scripts/timeline.test.ts', () => {
  test('パスがマッチする', () => {
    expect(
      new TimelinePageScript().validatePath(new URL('https://annict.com/')),
    ).toBe(true);
  });
});
