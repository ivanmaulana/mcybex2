import { Animation } from '../animations/animation';
import { ViewController } from '../components/nav/view-controller';
/**
 * @private
 **/
export declare class Transition extends Animation {
    constructor(opts: TransitionOptions);
    static createTransition(enteringView: ViewController, leavingView: ViewController, opts: TransitionOptions): Transition;
    static register(name: string, TransitionClass: any): void;
}
export interface TransitionOptions {
    animation: string;
    duration: number;
    easing: string;
    direction: string;
    renderDelay?: number;
    isRTL?: boolean;
}
