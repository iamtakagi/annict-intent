import { PageScript } from './base';

// https://annict.com/track
export class TrackPageScript extends PageScript {

  get name(): string {
      return 'TrackPageScript'
  }

  validatePath(url: URL): boolean {
    return url.pathname.startsWith('/track');
  }

  bindEvents(): void {
    const container = document.querySelectorAll(
      '#trackable-episode-list > div.u-container-flat.u-container-narrow > div',
    );
    const cards = container[0].childNodes;
    cards.forEach(card => {
      const cardBody = card.childNodes[0];
      const workDiv = cardBody.childNodes[0].childNodes[1].childNodes[0] as HTMLDivElement;
      if (!workDiv) return;
      const workTitle = workDiv.innerText;
      const workIdAttr = workDiv.getAttribute('data-tracking-offcanvas-button-frame-path');
      let workId: string;
      if (workIdAttr) {
        workId = workIdAttr.split('/')[3];
      }
      const episodeDiv = cardBody.childNodes[0].childNodes[1].childNodes[1] as HTMLDivElement;
      if (!episodeDiv) return;
      const episodeTitle = episodeDiv.innerText;
      const episodeIdAttr = episodeDiv.getAttribute('data-tracking-offcanvas-button-frame-path');
      let episodeId: string;
      if (episodeIdAttr) {
        episodeId = episodeIdAttr.split('/')[3];
      }
      console.log(workTitle, episodeTitle);
      const wrapper = cardBody.childNodes[1];
      if (!wrapper) return;
      const button = wrapper.childNodes[0].childNodes[0] as HTMLButtonElement;
      // ボタンが無かったらハンドラを登録しない
      if (!button) return;
      button.addEventListener('click', () => {
        const url = 'https://annict.com/works/' + workId + '/episodes/' + episodeId;
        window.open(
          'https://twitter.com/intent/tweet?text=' +
            encodeURIComponent(workTitle + 'の' + episodeTitle + 'を見ました') +
            '&url=' +
            encodeURIComponent(url),
        );
      });
    });
  }
}
