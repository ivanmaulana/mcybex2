import { ElementRef } from 'angular2/core';
import { ViewController } from '../nav/view-controller';
import { Navbar } from '../navbar/navbar';
import { MenuController } from './menu-controller';
/**
 * @name MenuToggle
 * @description
 * The `menuToggle` directive can be placed on any button to
 * automatically close an open menu.
 *
 * @usage
 * ```html
 * <button menuToggle>Toggle Menu</button>
 * ```
 *
 * To toggle a certain menu by its id or side, give the `menuToggle`
 * directive a value.
 *
 * ```html
 * <button menuToggle="right">Toggle Right Menu</button>
 * ```
 *
 * @demo /docs/v2/demos/menu/
 * @see {@link /docs/v2/components#menus Menu Component Docs}
 * @see {@link ../../menu/Menu Menu API Docs}
 */
export declare class MenuToggle {
    private _menu;
    private _viewCtrl;
    private _navbar;
    /**
     * @private
     */
    menuToggle: any;
    /**
     * @private
     */
    private _inNavbar;
    constructor(_menu: MenuController, elementRef: ElementRef, _viewCtrl: ViewController, _navbar: Navbar);
    /**
    * @private
    */
    toggle(): void;
    /**
    * @private
    */
    isHidden: boolean;
}
