import { PageScript } from './base';

// https://annict.com/
export class TimelinePageScript extends PageScript {
  get name(): string {
    return 'TimelinePageScript';
  }

  validatePath(url: URL): boolean {
    return url.pathname.startsWith('/');
  }

  bindEvents(): void {
    // Not implemented yet :(
  }
}
