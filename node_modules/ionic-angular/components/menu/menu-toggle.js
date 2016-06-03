"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var view_controller_1 = require('../nav/view-controller');
var navbar_1 = require('../navbar/navbar');
var menu_controller_1 = require('./menu-controller');
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
var MenuToggle = (function () {
    function MenuToggle(_menu, elementRef, _viewCtrl, _navbar) {
        this._menu = _menu;
        this._viewCtrl = _viewCtrl;
        this._navbar = _navbar;
        this._inNavbar = !!_navbar;
    }
    /**
    * @private
    */
    MenuToggle.prototype.toggle = function () {
        var menu = this._menu.get(this.menuToggle);
        menu && menu.toggle();
    };
    Object.defineProperty(MenuToggle.prototype, "isHidden", {
        /**
        * @private
        */
        get: function () {
            if (this._inNavbar && this._viewCtrl) {
                if (this._viewCtrl.isFirst()) {
                    // this is the first view, so it should always show
                    return false;
                }
                var menu = this._menu.get(this.menuToggle);
                if (menu) {
                    // this is not the root view, so see if this menu
                    // is configured to still be enabled if it's not the root view
                    return !menu.persistent;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuToggle.prototype, "menuToggle", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MenuToggle.prototype, "toggle", null);
    MenuToggle = __decorate([
        core_1.Directive({
            selector: '[menuToggle]',
            host: {
                '[hidden]': 'isHidden',
                'menuToggle': '' // ensures the attr is there for css when using [menuToggle]
            }
        }),
        __param(2, core_1.Optional()),
        __param(3, core_1.Optional()), 
        __metadata('design:paramtypes', [menu_controller_1.MenuController, core_1.ElementRef, view_controller_1.ViewController, navbar_1.Navbar])
    ], MenuToggle);
    return MenuToggle;
}());
exports.MenuToggle = MenuToggle;
