import { ElementRef, EventEmitter } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { Ion } from '../ion';
import { Config } from '../../config/config';
/**
* @private
*/
export declare class SearchbarInput {
    private _elementRef;
    private stopInput(ev);
    constructor(_elementRef: ElementRef);
}
/**
 * @name Searchbar
 * @module ionic
 * @description
 * Manages the display of a Searchbar which can be used to search or filter items.
 *
 * @usage
 * ```html
 * <ion-searchbar
 *   [(ngModel)]="myInput"
 *   [hideCancelButton]="shouldHideCancel"
 *   (input)="onInput($event)"
 *   (cancel)="onCancel($event)">
 * </ion-searchbar>
 * ```
 *
 * @demo /docs/v2/demos/searchbar/
 * @see {@link /docs/v2/components#searchbar Searchbar Component Docs}
 */
export declare class Searchbar extends Ion {
    private _elementRef;
    private _config;
    private _tmr;
    /**
     * @private
     */
    searchbarInput: any;
    /**
     * @input {string} Sets the cancel button text to the value passed in
     */
    cancelButtonText: string;
    /**
     * @input {boolean} Hides the cancel button
     */
    hideCancelButton: any;
    /**
     * @input {number} How long, in milliseconds, to wait to trigger the `input` event after each keystroke. Default `250`.
     */
    debounce: number;
    /**
     * @input {string} Sets input placeholder to the value passed in
     */
    placeholder: string;
    /**
     * @input {any} Expression to evaluate when the Searchbar input has changed including cleared
     */
    ngModel: any;
    /**
     * @output {event} When the Searchbar input has changed including cleared
     */
    input: EventEmitter<Searchbar>;
    /**
     * @output {event} When the Searchbar input has blurred
     */
    blur: EventEmitter<Searchbar>;
    /**
     * @output {event} When the Searchbar input has focused
     */
    focus: EventEmitter<Searchbar>;
    /**
     * @output {event} When the cancel button is clicked
     */
    cancel: EventEmitter<Searchbar>;
    /**
     * @output {event} When the clear input button is clicked
     */
    clear: EventEmitter<Searchbar>;
    /**
     * @private
     */
    value: string;
    /**
     * @private
     */
    blurInput: boolean;
    /**
     * @private
     */
    inputElement: any;
    /**
     * @private
     */
    searchIconElement: any;
    /**
     * @private
     */
    mode: string;
    /**
     * @private
     */
    isFocused: any;
    /**
     * @private
     */
    shouldLeftAlign: any;
    constructor(_elementRef: ElementRef, _config: Config, ngControl: NgControl);
    /**
     * @private
     * On Initialization check for attributes
     */
    ngOnInit(): void;
    /**
     * @private
     * After View Initialization check the value
     */
    ngAfterViewInit(): void;
    /**
     * @private
     * Determines whether or not to add style to the element
     * to center it properly (ios only)
     */
    setElementLeft(): void;
    /**
     * @private
     * Calculates the amount of padding/margin left for the elements
     * in order to center them based on the placeholder width
     */
    addElementLeft(): void;
    /**
     * @private
     * Update the Searchbar input value when the input changes
     */
    inputChanged(ev: any): void;
    /**
     * @private
     * Sets the Searchbar to focused and aligned left on input focus.
     */
    inputFocused(): void;
    /**
     * @private
     * Sets the Searchbar to not focused and checks if it should align left
     * based on whether there is a value in the searchbar or not.
     */
    inputBlurred(): void;
    /**
     * @private
     * Clears the input field and triggers the control change.
     */
    clearInput(): void;
    /**
     * @private
     * Clears the input field and tells the input to blur since
     * the clearInput function doesn't want the input to blur
     * then calls the custom cancel function if the user passed one in.
     */
    cancelSearchbar(): void;
    /**
     * @private
     * Write a new value to the element.
     */
    writeValue(value: any): void;
    /**
     * @private
     */
    onChange: (_: any) => void;
    /**
     * @private
     */
    onTouched: () => void;
    /**
     * @private
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn: (_: any) => {}): void;
    /**
     * @private
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn: () => {}): void;
}
