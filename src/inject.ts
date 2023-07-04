import { PageScript } from './scripts/base';
import { TrackPageScript } from './scripts/track';
import { WorkDetailPageScript, WorksListPageScript } from './scripts/works';

// ページ毎に処理を分ける
const main = async (currentURL: string = location.href) => {
  const url = new URL(currentURL);
  const scripts: ReadonlyArray<PageScript> = [
    new TrackPageScript(),
    new WorkDetailPageScript(),
    new WorksListPageScript(),
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
