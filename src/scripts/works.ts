import { kind, validate } from '../types/kind';
import { PageScript } from './base';

// https://annict.com/works/^[0-9]+$
export class WorksPageScript extends PageScript {
  get name(): string {
    return 'WorksPageScript';
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
            encodeURIComponent(workTitle + 'の視聴状況を「' + kind[statusKind] + '」にしました') +
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
    
  }
}
