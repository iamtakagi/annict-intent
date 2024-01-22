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
        const status = button.getAttribute('data-status-kind');
        console.log(status);
        if (status === null || status == undefined) return;
        if (typeof status !== 'string') return;
        if (!status) return;
        const foundStatus = Status[status as keyof typeof Status];
        console.log(foundStatus);
        const workTitle = document.querySelector('h1.fw-bold > a:nth-child(1)')?.innerHTML || '';
        window.open(
          'https://x.com/intent/tweet?text=' +
            encodeURIComponent(workTitle + ' の視聴ステータスを「' + foundStatus + '」にしました') +
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
