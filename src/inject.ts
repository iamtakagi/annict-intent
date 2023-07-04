import { PageScript } from './scripts/base';
import { TrackPageScript } from './scripts/track';
import { UserPageScript, UserRecordsPageScript, UserWatchingPageScript } from './scripts/user';
import { WorksPageScript, WorksListPageScript } from './scripts/works';

// ページ毎に処理を分ける
const main = async (currentURL: string = location.href) => {
  const url = new URL(currentURL);
  const scripts: ReadonlyArray<PageScript> = [
    new TrackPageScript(),
    new WorksPageScript(),
    new WorksListPageScript(),
    new UserPageScript(),
    new UserRecordsPageScript(),
    new UserWatchingPageScript()
  ];
  scripts.forEach(script => {
    if (script.validatePath(url)) {
      console.log(`[Annict Intent Tweet] ${script.name} is running.`);
      script.bindEvents();
    }
  });
};

window.addEventListener('load', () => {
  main().catch(e => {
    console.error(e);
  });
});
