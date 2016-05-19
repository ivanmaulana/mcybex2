/**
 * @private
 **/
export declare class Animation {
    private _parent;
    private _c;
    private _el;
    private _opts;
    private _fx;
    private _dur;
    private _easing;
    private _bfSty;
    private _bfAdd;
    private _bfRmv;
    private _afSty;
    private _afAdd;
    private _afRmv;
    private _pFns;
    private _fFns;
    private _fOnceFns;
    private _wChg;
    private _rv;
    private _unregTrans;
    private _tmr;
    private _lastUpd;
    isPlaying: boolean;
    hasTween: boolean;
    hasCompleted: boolean;
    constructor(ele?: any, opts?: AnimationOptions);
    _reset(): void;
    element(ele: any): Animation;
    private _addEle(ele);
    parent(parentAnimation: Animation): Animation;
    add(childAnimation: Animation): Animation;
    getDuration(): number;
    duration(milliseconds: number): Animation;
    getEasing(): string;
    easing(name: string): Animation;
    from(prop: string, val: any): Animation;
    to(prop: string, val: any, clearProperyAfterTransition?: boolean): Animation;
    fromTo(prop: string, fromVal: any, toVal: any, clearProperyAfterTransition?: boolean): Animation;
    private _addProp(state, prop, val);
    fadeIn(): Animation;
    fadeOut(): Animation;
    before: {
        addClass: (className: string) => Animation;
        removeClass: (className: string) => Animation;
        setStyles: (styles: {
            [property: string]: any;
        }) => Animation;
        clearStyles: (propertyNames: string[]) => Animation;
    };
    after: {
        addClass: (className: string) => Animation;
        removeClass: (className: string) => Animation;
        setStyles: (styles: {
            [property: string]: any;
        }) => Animation;
        clearStyles: (propertyNames: string[]) => Animation;
    };
    play(opts?: PlayOptions): void;
    stop(opts?: PlayOptions): void;
    _asyncEnd(duration: number, shouldComplete: boolean): void;
    _clearAsync(): void;
    _progress(stepValue: number): void;
    _setTrans(duration: number, forcedLinearEasing: boolean): void;
    _willChg(addWillChange: boolean): void;
    _before(): void;
    _after(): void;
    progressStart(): void;
    progressStep(stepValue: number): void;
    progressEnd(shouldComplete: boolean, currentStepValue: number): void;
    onPlay(callback: Function): Animation;
    onFinish(callback: Function, onceTimeCallback?: boolean, clearOnFinishCallacks?: boolean): Animation;
    _didFinish(hasCompleted: boolean): void;
    reverse(shouldReverse?: boolean): Animation;
    destroy(removeElement?: boolean): void;
    _transEl(): HTMLElement;
    static create(name: string, opts?: AnimationOptions): Animation;
    static register(name: string, AnimationClass: any): void;
}
export interface AnimationOptions {
    animation?: string;
    renderDelay?: number;
}
export interface PlayOptions {
    duration?: number;
    stepValue?: number;
}
