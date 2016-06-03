export declare const raf: any;
export declare const cancelRaf: any;
export declare const nativeTimeout: any;
export declare const clearNativeTimeout: any;
export declare function rafFrames(framesToWait: any, callback: any): void;
export declare let CSS: {
    transform?: string;
    transition?: string;
    transitionDuration?: string;
    transitionDelay?: string;
    transitionTimingFn?: string;
    transitionStart?: string;
    transitionEnd?: string;
};
export declare function transitionEnd(el: HTMLElement, callback: Function): () => void;
export declare function ready(callback?: Function): any;
export declare function windowLoad(callback?: Function): any;
export declare function pointerCoord(ev: any): {
    x: number;
    y: number;
};
export declare function hasPointerMoved(threshold: any, startCoord: any, endCoord: any): boolean;
export declare function isActive(ele: any): boolean;
export declare function hasFocus(ele: any): boolean;
export declare function isTextInput(ele: any): boolean;
export declare function hasFocusedTextInput(): boolean;
export declare function copyInputAttributes(srcElement: any, destElement: any): void;
export declare function closest(ele: HTMLElement, selector: string, checkSelf?: boolean): HTMLElement;
/**
 * Get the element offsetWidth and offsetHeight. Values are cached
 * to reduce DOM reads. Cache is cleared on a window resize.
 */
export declare function getDimensions(ele: HTMLElement, id: string): {
    width: number;
    height: number;
    left: number;
    top: number;
};
export declare function clearDimensions(id: string): void;
export declare function windowDimensions(): {
    width: number;
    height: number;
};
export declare function flushDimensionCache(): void;
