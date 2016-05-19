import { ElementRef, NgZone, Compiler, AppViewManager, Renderer } from 'angular2/core';
import { IonicApp } from '../app/app';
import { Config } from '../../config/config';
import { Keyboard } from '../../util/keyboard';
import { NavController } from './nav-controller';
import { ViewController } from './view-controller';
/**
 * @private
 */
export declare class Portal extends NavController {
    constructor(hostNavCtrl: NavController, viewCtrl: ViewController, app: IonicApp, config: Config, keyboard: Keyboard, elementRef: ElementRef, compiler: Compiler, viewManager: AppViewManager, zone: NgZone, renderer: Renderer);
}
