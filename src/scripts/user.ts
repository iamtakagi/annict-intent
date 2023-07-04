import { kind, validate } from '../types/kind';
import { PageScript } from './base';

// https://annict.com/@username
export class UserProfilePageScript extends PageScript {
  get name(): string {
    return 'UserProfilePageScript';
  }

  validatePath(url: URL): boolean {
    return url.pathname.startsWith('/@') && url.pathname.split('/').length === 2;
  }

  bindEvents(): void {
  }
}

// https://annict.com/@username/records
export class UserRecordsPageScript extends PageScript {
  get name(): string {
    return 'UserRecordsPageScript';
  }

  validatePath(url: URL): boolean {
    return (
      url.pathname.startsWith('/@') &&
      url.pathname.split('/').length === 3 &&
      url.pathname.split('/')[2].startsWith('records')
    );
  }

  bindEvents(): void {}
}

// https://annict.com/@username/watching
export class UserWatchingPageScript extends PageScript {
  get name(): string {
    return 'UserWatchingPageScript';
  }

  validatePath(url: URL): boolean {
    return (
      url.pathname.startsWith('/@') &&
      url.pathname.split('/').length === 3 &&
      url.pathname.split('/')[2].startsWith('watching')
    );
  }

  bindEvents(): void {}
}
