import { Activator } from './activator';
/**
 * @private
 */
export declare class RippleActivator extends Activator {
    constructor(app: any, config: any, zone: any);
    downAction(ev: any, activatableEle: any, pointerX: any, pointerY: any): void;
    upAction(ev: UIEvent, activatableEle: HTMLElement, pointerX: number, pointerY: number): void;
    deactivate(): void;
}
