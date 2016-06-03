export declare class Activator {
    protected app: any;
    protected _zone: any;
    protected _css: string;
    protected _queue: Array<HTMLElement>;
    protected _active: Array<HTMLElement>;
    constructor(app: any, config: any, _zone: any);
    downAction(ev: any, activatableEle: any, pointerX: any, pointerY: any): void;
    upAction(ev: UIEvent, activatableEle: HTMLElement, pointerX: number, pointerY: number): void;
    clearState(): void;
    deactivate(): void;
    disableActivated(ev: any): boolean;
}
