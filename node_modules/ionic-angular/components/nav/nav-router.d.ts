import { ElementRef, DynamicComponentLoader } from 'angular2/core';
import { RouterOutlet, Router, ComponentInstruction } from 'angular2/router';
import { Nav } from './nav';
import { ViewController } from './view-controller';
/**
 * @private
 */
export declare class NavRouter extends RouterOutlet {
    private _lastUrl;
    private _nav;
    private _parent;
    constructor(elementRef: ElementRef, loader: DynamicComponentLoader, parentRouter: Router, nameAttr: string, nav: Nav);
    stateChange(direction: string, viewCtrl: ViewController): void;
    activate(nextInstruction: ComponentInstruction): Promise<any>;
    reuse(nextInstruction: ComponentInstruction): Promise<void>;
    getPathRecognizerByComponent(componentType: any): any;
}
