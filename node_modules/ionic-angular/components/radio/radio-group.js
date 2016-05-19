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
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var list_1 = require('../list/list');
var util_1 = require('../../util/util');
var RADIO_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return RadioGroup; }), multi: true });
/**
 * @name RadioGroup
 * @description
 * A radio group is a group of radio button components, and its value
 * comes from the checked radio button's value. Selecting a radio
 * button in the group unchecks all others in the group.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/ts/latest/guide/forms.html)
 * for more info on forms and inputs.
 *
 * @usage
 * ```html
 * <ion-list radio-group [(ngModel)]="autoManufacturers">
 *
 *   <ion-list-header>
 *     Auto Manufacturers
 *   </ion-list-header>
 *
 *   <ion-item>
 *     <ion-label>Cord</ion-label>
 *     <ion-radio value="cord"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Duesenberg</ion-label>
 *     <ion-radio value="duesenberg"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Hudson</ion-label>
 *     <ion-radio value="hudson"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Packard</ion-label>
 *     <ion-radio value="packard"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Studebaker</ion-label>
 *     <ion-radio value="studebaker"></ion-radio>
 *   </ion-item>
 *
 * </ion-list>
 * ```
 *
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
*/
var RadioGroup = (function () {
    function RadioGroup(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._btns = [];
        this._ids = -1;
        this._init = false;
        /**
         * @output {any} expression to be evaluated when selection has been changed
         */
        this.change = new core_1.EventEmitter();
        this.id = ++radioGroupIds;
    }
    /**
     * @private
     */
    RadioGroup.prototype.writeValue = function (val) {
        void 0;
        this.value = val;
        if (this._init) {
            this._update();
            this.onTouched();
            this.change.emit(val);
        }
        this._init = true;
    };
    /**
     * @private
     */
    RadioGroup.prototype.ngAfterContentInit = function () {
        var activeButton = this._btns.find(function (b) { return b.checked; });
        if (activeButton) {
            this._setActive(activeButton);
        }
    };
    /**
     * @private
     */
    RadioGroup.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function (val) {
            // onChange used when there's an ngControl
            void 0;
            fn(val);
            _this.value = val;
            _this._update();
            _this.onTouched();
            _this.change.emit(val);
        };
    };
    /**
     * @private
     */
    RadioGroup.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     */
    RadioGroup.prototype._update = function () {
        var _this = this;
        // loop through each of the radiobuttons
        var hasChecked = false;
        this._btns.forEach(function (radioButton) {
            // check this radiobutton if its value is
            // the same as the radiogroups value
            radioButton.checked = util_1.isCheckedProperty(_this.value, radioButton.value) && !hasChecked;
            if (radioButton.checked) {
                // if this button is checked, then set it as
                // the radiogroup's active descendant
                _this._setActive(radioButton);
                hasChecked = true;
            }
        });
    };
    RadioGroup.prototype._setActive = function (radioButton) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-activedescendant', radioButton.id);
    };
    /**
     * @private
     */
    RadioGroup.prototype.add = function (button) {
        var _this = this;
        this._btns.push(button);
        // listen for radiobutton select events
        button.select.subscribe(function (val) {
            // this radiobutton has been selected
            _this.onChange(val);
        });
        return this.id + '-' + (++this._ids);
    };
    /**
     * @private
     */
    RadioGroup.prototype.remove = function (button) {
        var index = this._btns.indexOf(button);
        if (index > -1) {
            if (button.value === this.value) {
                this.value = null;
            }
            this._btns.splice(index, 1);
        }
    };
    Object.defineProperty(RadioGroup.prototype, "_header", {
        /**
         * @private
         */
        set: function (header) {
            if (header) {
                if (!header.id) {
                    header.id = 'rg-hdr-' + this.id;
                }
                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-describedby', header.id);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    RadioGroup.prototype.onChange = function (val) {
        // onChange used when there is not an ngControl
        void 0;
        this.value = val;
        this._update();
        this.onTouched();
        this.change.emit(val);
    };
    /**
     * @private
     */
    RadioGroup.prototype.onTouched = function () { };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RadioGroup.prototype, "change", void 0);
    __decorate([
        core_1.ContentChild(list_1.ListHeader), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], RadioGroup.prototype, "_header", null);
    RadioGroup = __decorate([
        core_1.Directive({
            selector: '[radio-group]',
            host: {
                '[attr.aria-activedescendant]': 'activeId',
                'role': 'radiogroup'
            },
            providers: [RADIO_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], RadioGroup);
    return RadioGroup;
}());
exports.RadioGroup = RadioGroup;
var radioGroupIds = -1;
