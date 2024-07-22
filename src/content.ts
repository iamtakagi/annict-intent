import { Status } from './status';

const main = async (url = new URL(location.href)) => {
  const accessToken = (await browser.storage.sync.get("accessToken"))["accessToken"]
  if (url.pathname.startsWith('/works')) {
    const workId = url.pathname.split('/')[2];
    const worksRes = await (
      await fetch(`https://api.annict.com/v1/works?access_token=${accessToken}&filter_ids=${workId}`)
    ).json();
    const usernameSelector = document.querySelector('div.text-secondary:nth-child(2)')
    if (!usernameSelector) return;
    const username = usernameSelector.innerHTML.replace('@', '') || '';
    if (worksRes == null) return;
    const work = worksRes.works[0];
    if (new RegExp(/^[0-9]+$/).test(url.pathname.split('/')[2])) {
      window.addEventListener('click', e => {
        if (e.target instanceof HTMLButtonElement) {
          const button = e.target;
          if (button == null) return;
          const action = button.getAttribute('data-action');
          if (action == null || action.length < 0) return;
          if (action === 'status-select-dropdown#change') {
            const dataStatusKind = button.getAttribute('data-status-kind');
            if (dataStatusKind === null || dataStatusKind == undefined) return;
            if (typeof dataStatusKind !== 'string') return;
            if (!dataStatusKind) return;
            const statusKind = Status[dataStatusKind as keyof typeof Status];
            const workTitle =
              document.querySelector('h1.fw-bold > a:nth-child(1)')?.innerHTML || '';
            window.open(
              'https://x.com/intent/tweet?text=' +
                encodeURIComponent(
                  workTitle + ' の視聴ステータスを「' + statusKind + '」にしました',
                ) +
                '&url=' +
                encodeURIComponent(`https://annict.com/@${username}/watching`) +
                '&hashtags=' +
                work.twitter_hashtag,
            );
          }
        }
      });
      if (
        new RegExp(/^[0-9]+$/).test(url.pathname.split('/')[2]) &&
        url.pathname.split('/')[3] === 'episodes' &&
        new RegExp(/^[0-9]+$/).test(url.pathname.split('/')[4])
      ) {
        window.addEventListener('click', async e => {
          if (e.target instanceof HTMLInputElement) {
            const input = e.target;
            if (input == null) return;
            if (
              input.className.includes('btn') &&
              input.name === 'commit' &&
              input.value === '記録する'
            ) {
              const workTitle =
                document.querySelector('h1.fw-bold > a:nth-child(1)')?.innerHTML || '';
              const episodeTitle =
                document.querySelector('h2.fw-bold > a:nth-child(1)')?.innerHTML || '';
              window.open(
                'https://x.com/intent/tweet?text=' +
                  encodeURIComponent(workTitle + ' ' + episodeTitle + ' を見ました') +
                  '&url=' +
                  encodeURIComponent(`https://annict.com/@${username}/records`) +
                  '&hashtags=' +
                  work.twitter_hashtag,
              );
            }
          }
        });
      }
    }
  }
};

window.addEventListener('load', () => {
  main().catch(e => {
    console.error(e);
  });
});
