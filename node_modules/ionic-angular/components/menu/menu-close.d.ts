import { MenuController } from './menu-controller';
/**
 * @name MenuClose
 * @description
 * The `menuClose` directive can be placed on any button to
 * automatically close an open menu.
 *
 * @usage
 * ```html
 * <button menuClose>Close Menu</button>
 * ```
 *
 * To close a certain menu by its id or side, give the `menuClose`
 * directive a value.
 *
 * ```html
 * <button menuClose="left">Close Left Menu</button>
 * ```
 *
 * @demo /docs/v2/demos/menu/
 * @see {@link /docs/v2/components#menus Menu Component Docs}
 * @see {@link ../../menu/Menu Menu API Docs}
 */
export declare class MenuClose {
    private _menu;
    /**
     * @private
     */
    menuClose: any;
    constructor(_menu: MenuController);
    /**
    * @private
    */
    close(): void;
}
