export abstract class PageScript {
    abstract get name(): string;
    abstract validatePath(url: URL): boolean;
    abstract bindEvents(): void;
}
