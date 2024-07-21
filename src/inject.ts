import { Status } from './status';

const main = async (url = new URL(location.href)) => {
  if (
    !(url.pathname.startsWith('/works') && new RegExp(/^[0-9]+$/).test(url.pathname.split('/')[2]))
  ) {
    return;
  }
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
        const workTitle = document.querySelector('h1.fw-bold > a:nth-child(1)')?.innerHTML || '';
        window.open(
          'https://x.com/intent/tweet?text=' +
            encodeURIComponent(workTitle + ' の視聴ステータスを「' + statusKind + '」にしました') +
            '&url=' +
            encodeURIComponent(location.href),
        );
      }
    }
  });
};

window.addEventListener('load', () => {
  main().catch(e => {
    console.error(e);
  });
});
