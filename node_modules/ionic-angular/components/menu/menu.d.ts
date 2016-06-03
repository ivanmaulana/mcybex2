import { EventEmitter, ElementRef, NgZone, Renderer } from 'angular2/core';
import { Ion } from '../ion';
import { Config } from '../../config/config';
import { Platform } from '../../platform/platform';
import { Keyboard } from '../../util/keyboard';
import { MenuController } from './menu-controller';
/**
 * @private
 */
export declare class Menu extends Ion {
    private _menuCtrl;
    private _elementRef;
    private _config;
    private _platform;
    private _renderer;
    private _keyboard;
    private _zone;
    private _preventTime;
    private _cntEle;
    private _cntGesture;
    private _menuGesture;
    private _type;
    private _resizeUnreg;
    private _isEnabled;
    private _isSwipeEnabled;
    private _isPers;
    private _init;
    /**
     * @private
     */
    isOpen: boolean;
    /**
     * @private
     */
    backdrop: MenuBackdrop;
    /**
     * @private
     */
    onContentClick: EventListener;
    /**
     * @private
     */
    content: any;
    /**
     * @private
     */
    id: string;
    /**
     * @private
     */
    side: string;
    /**
     * @private
     */
    type: string;
    /**
     * @private
     */
    enabled: boolean;
    /**
     * @private
     */
    swipeEnabled: boolean;
    /**
     * @private
     */
    persistent: boolean;
    /**
     * @private
     */
    maxEdgeStart: number;
    /**
     * @private
     */
    opening: EventEmitter<number>;
    constructor(_menuCtrl: MenuController, _elementRef: ElementRef, _config: Config, _platform: Platform, _renderer: Renderer, _keyboard: Keyboard, _zone: NgZone);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    private _setListeners();
    /**
     * @private
     */
    private _getType();
    /**
     * Sets the state of the Menu to open or not.
     * @param {boolean} shouldOpen  If the Menu is open or not.
     * @return {Promise} returns a promise once set
     */
    setOpen(shouldOpen: boolean): Promise<boolean>;
    /**
     * @private
     */
    swipeStart(): void;
    /**
     * @private
     */
    swipeProgress(stepValue: number): void;
    /**
     * @private
     */
    swipeEnd(shouldComplete: boolean, currentStepValue: number): void;
    /**
     * @private
     */
    private _before();
    /**
     * @private
     */
    private _after(isOpen);
    /**
     * @private
     */
    private _prevent();
    /**
     * @private
     */
    private _isPrevented();
    /**
     * Progamatically open the Menu.
     * @return {Promise} returns a promise when the menu is fully opened.
     */
    open(): Promise<boolean>;
    /**
     * Progamatically close the Menu.
     * @return {Promise} returns a promise when the menu is fully closed.
     */
    close(): Promise<boolean>;
    /**
     * Toggle the menu. If it's closed, it will open, and if opened, it will close.
     * @return {Promise} returns a promise when the menu has been toggled.
     */
    toggle(): Promise<boolean>;
    /**
     * Used to enable or disable a menu. For example, there could be multiple
     * left menus, but only one of them should be able to be opened at the same
     * time. If there are multiple menus on the same side, then enabling one menu
     * will also automatically disable all the others that are on the same side.
     * @param {boolean} shouldEnable  True if it should be enabled, false if not.
     * @return {Menu}  Returns the instance of the menu, which is useful for chaining.
     */
    enable(shouldEnable: boolean): Menu;
    /**
     * Used to enable or disable the ability to swipe open the menu.
     * @param {boolean} shouldEnable  True if it should be swipe-able, false if not.
     * @return {Menu}  Returns the instance of the menu, which is useful for chaining.
     */
    swipeEnable(shouldEnable: boolean): Menu;
    /**
     * @private
     */
    getMenuElement(): HTMLElement;
    /**
     * @private
     */
    getContentElement(): HTMLElement;
    /**
     * @private
     */
    getBackdropElement(): HTMLElement;
    /**
     * @private
     */
    ngOnDestroy(): void;
}
/**
 * @private
 */
export declare class MenuBackdrop {
    private _menuCtrl;
    elementRef: ElementRef;
    constructor(_menuCtrl: Menu, elementRef: ElementRef);
    /**
     * @private
     */
    private clicked(ev);
}
