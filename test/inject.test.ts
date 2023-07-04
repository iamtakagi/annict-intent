describe('inject.test.ts', () => {
  test('スラッシュが付いてなくてもインデックス判定である', () => {
    expect(new URL('https://google.co.jp').pathname.startsWith('/')).toBe(true);
  });
  test('スラッシュが付いていてもインデックス判定である', () => {
    expect(new URL('https://google.co.jp/').pathname.startsWith('/')).toBe(true);
  });
});
