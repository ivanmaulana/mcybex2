import { NavController } from './nav-controller';
import { SlideEdgeGesture } from '../../gestures/slide-edge-gesture';
import { SlideData } from '../../gestures/slide-gesture';
export declare class SwipeBackGesture extends SlideEdgeGesture {
    private _nav;
    constructor(element: HTMLElement, options: any, _nav: NavController);
    canStart(ev: any): boolean;
    onSlideBeforeStart(): void;
    onSlide(slide: SlideData): void;
    onSlideEnd(slide: SlideData, ev: any): void;
}
