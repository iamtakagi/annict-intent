import { kind, validate } from '../types/kind';
import { PageScript } from './base';

// https://annict.com/works/^[0-9]+$
export class WorkDetailPageScript extends PageScript {
  get name(): string {
    return 'WorkDetailPageScript';
  }

  validatePath(url: URL): boolean {
    return (
      url.pathname.startsWith('/works') && new RegExp(/^[0-9]+$/).test(url.pathname.split('/')[2])
    );
  }

  bindEvents(): void {
    const workTitle = document.querySelectorAll(
      'body > div > div.l-default__main.d-flex.flex-column > div.l-default__content > div.c-work-header.pt-3 > div.container > div > div.col.mt-3.mt-sm-0 > h1 > a',
    )[0].innerHTML;
    const ul = document.querySelectorAll(
      'body > div > div.l-default__main.d-flex.flex-column > div.l-default__content > div.c-work-header.pt-3 > div.container > div > div.col-12.col-sm-auto > div > div > div > div > ul',
    )[0];
    const li = ul.childNodes;
    li.forEach(li => {
      const button = li.childNodes[0] as HTMLButtonElement;
      const statusKind = button.getAttribute('data-status-kind');
      button.addEventListener('click', () => {
        console.log(statusKind);
        if (!statusKind) return;
        if (!validate(statusKind)) return;
        const url = 'https://annict.com/works/' + location.pathname.split('/')[2];
        window.open(
          'https://twitter.com/intent/tweet?text=' +
            encodeURIComponent(
              workTitle + ' の視聴ステータスを「' + kind[statusKind] + '」にしました',
            ) +
            '&url=' +
            encodeURIComponent(url),
        );
      });
    });
  }
}

// https://annict.com/works/^[0-9]+\-(?:spring|summer|autumn|winter)$
// https://annict.com/works/popular
// https://annict.com/works/newest
export class WorksListPageScript extends PageScript {
  get name(): string {
    return 'WorksListPageScript';
  }

  validatePath(url: URL): boolean {
    return (
      url.pathname.startsWith('/works') &&
      (new RegExp(/^[0-9]+\-(?:spring|summer|autumn|winter)$/).test(url.pathname.split('/')[2]) ||
        url.pathname.split('/')[2].startsWith('popular') ||
        url.pathname.split('/')[2].startsWith('newest'))
    );
  }

  bindEvents(): void {
    const container = document.querySelectorAll(
      'body > div > div.l-default__main.d-flex.flex-column > div.l-default__content > div.container.mt-3.u-container-flat > div > div > div > div',
    )[0];
    // container.childNodes に含まれる #text を除外 (テキストノードが含まれてしまう理由はわかっていない)
    const cards = Array.from(container.childNodes).filter(node => node.nodeName !== '#text');
    cards.forEach(card => {
      const content = Array.from(card.childNodes).filter(node => node.nodeName !== '#text');
      const a = content[1];
      const b = Array.from(a.childNodes).filter(node => node.nodeName !== '#text');
      const c = b[0] as HTMLAnchorElement;
      const workTitle = c.getAttribute('title');
      const workHref = c.getAttribute('href');
      let workId: string;
      if (workHref) {
        workId = workHref.split('/')[2];
      }
      const d = content[2];
      const e = Array.from(d.childNodes).filter(node => node.nodeName !== '#text');
      const f = Array.from(e[0].childNodes).filter(node => node.nodeName !== '#text');
      const g = Array.from(f[0].childNodes).filter(node => node.nodeName !== '#text');
      const ul = g[1] as HTMLUListElement;
      const li = ul.childNodes;
      li.forEach(li => {
        const button = li.childNodes[0] as HTMLButtonElement;
        const statusKind = button.getAttribute('data-status-kind');
        button.addEventListener('click', () => {
          console.log(statusKind);
          if (!statusKind) return;
          if (!validate(statusKind)) return;
          const url = 'https://annict.com/works/' + workId;
          window.open(
            'https://twitter.com/intent/tweet?text=' +
              encodeURIComponent(
                workTitle + ' の視聴ステータスを「' + kind[statusKind] + '」にしました',
              ) +
              '&url=' +
              encodeURIComponent(url),
          );
        });
      });
    });
  }
}
