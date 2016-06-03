import { ElementRef, Renderer, EventEmitter } from 'angular2/core';
import { RadioButton } from './radio-button';
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
export declare class RadioGroup {
    private _renderer;
    private _elementRef;
    private _btns;
    private _fn;
    private _ids;
    private _init;
    /**
     * @private
     */
    value: any;
    /**
     * @private
     */
    id: number;
    /**
     * @output {any} expression to be evaluated when selection has been changed
     */
    change: EventEmitter<RadioGroup>;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    /**
     * @private
     */
    writeValue(val: any): void;
    /**
     * @private
     */
    ngAfterContentInit(): void;
    /**
     * @private
     */
    registerOnChange(fn: Function): void;
    /**
     * @private
     */
    registerOnTouched(fn: any): void;
    /**
     * @private
     */
    private _update();
    private _setActive(radioButton);
    /**
     * @private
     */
    add(button: RadioButton): string;
    /**
     * @private
     */
    remove(button: RadioButton): void;
    /**
     * @private
     */
    private _header;
    /**
     * @private
     */
    onChange(val: any): void;
    /**
     * @private
     */
    onTouched(): void;
}
