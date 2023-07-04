import { WorksListPageScript, WorksPageScript } from '../../src/scripts/works';

describe('scripts/works.test.ts', () => {
  test('パスがマッチする', () => {
    expect(new WorksPageScript().validatePath(new URL('https://annict.com/works/1234567890'))).toBe(
      true,
    );
  });
  describe('パスがマッチする', () => {
    let worksListPageScript: WorksListPageScript;
    beforeEach(() => {
      worksListPageScript = new WorksListPageScript();
    });
    it('パスがマッチする', () => {
      [
        'https://annict.com/works/2023-spring',
        'https://annict.com/works/2023-summer',
        'https://annict.com/works/2023-autumn',
        'https://annict.com/works/2023-winter',
        'https://annict.com/works/popular',
        'https://annict.com/works/newest',
      ].forEach(url => {
        expect(worksListPageScript.validatePath(new URL(url))).toBe(true);
      });
    });
  });
});
