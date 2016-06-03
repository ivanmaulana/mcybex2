/**
* @ngdoc service
* @name Config
* @module ionic
* @description
* Config allows you to set the modes of your components
*/
import { Platform } from '../platform/platform';
/**
 * @name Config
 * @demo /docs/v2/demos/config/
 * @description
 * The Config lets you configure your entire app or specific platforms.
 * You can set the tab placement, icon mode, animations, and more here.
 *
 * ```ts
 * @App({
 *   template: `<ion-nav [root]="root"></ion-nav>`
 *   config: {
 *     backButtonText: 'Go Back',
 *     iconMode: 'ios',
 *     modalEnter: 'modal-slide-in',
 *     modalLeave: 'modal-slide-out',
 *     tabbarPlacement: 'bottom',
 *     pageTransition: 'ios',
 *   }
 * })
 * ```
 *
 * To change the mode to always use Material Design (md).
 *
 * ```ts
 * @App({
 *   template: `<ion-nav [root]="root"></ion-nav>`
 *   config: {
 *     mode: 'md'
 *   }
 * })
 * ```
 *
 * Config can be overwritten at multiple levels allowing for more configuration. Taking the example from earlier, we can override any setting we want based on a platform.
 * ```ts
 * @App({
 *   template: `<ion-nav [root]="root"></ion-nav>`
 *   config: {
 *     tabbarPlacement: 'bottom',
 *     platforms: {
 *      ios: {
 *        tabbarPlacement: 'top',
 *      }
 *     }
 *   }
 * })
 * ```
 *
 * We could also configure these values at a component level. Take `tabbarPlacement`, we can configure this as a property on our `ion-tabs`.
 *
 * ```html
 * <ion-tabs tabbarPlacement="top">
 *    <ion-tab tabTitle="Dash" tabIcon="pulse" [root]="tabRoot"></ion-tab>
 *  </ion-tabs>
 * ```
 *
 * The last way we could configure is through URL query strings. This is useful for testing while in the browser.
 * Simply add `?ionic<PROPERTYNAME>=<value>` to the url.
 *
 * ```bash
 * http://localhost:8100/?ionicTabbarPlacement=bottom
 * ```
 *
 * Custom values can be added to config, and looked up at a later point in time.
 *
 * ``` javascript
 * config.set('ios', 'favoriteColor', 'green');
 * // from any page in your app:
 * config.get('favoriteColor'); // 'green'
 * ```
 *
 *
 * A config value can come from anywhere and be anything, but there are a default set of values.
 *
 *
 * | Config property            | Default iOS Value      | Default MD Value          |
 * |----------------------------|------------------------|---------------------------|
 * | activator                  | highlight              | ripple                    |
 * | actionSheetEnter           | action-sheet-slide-in  | action-sheet-md-slide-in  |
 * | actionSheetLeave           | action-sheet-slide-out | action-sheet-md-slide-out |
 * | alertEnter                 | alert-pop-in           | alert-md-pop-in           |
 * | alertLeave                 | alert-pop-out          | alert-md-pop-out          |
 * | backButtonText             | Back                   |                           |
 * | backButtonIcon             | ion-ios-arrow-back     | ion-md-arrow-back         |
 * | iconMode                   | ios                    | md                        |
 * | menuType                   | reveal                 | overlay                   |
 * | modalEnter                 | modal-slide-in         | modal-md-slide-in         |
 * | modalLeave                 | modal-slide-out        | modal-md-slide-out        |
 * | pageTransition             | ios-transition         | md-transition             |
 * | pageTransitionDelay        | 16                     | 120                       |
 * | tabbarPlacement            | bottom                 | top                       |
 * | tabbarHighlight            |                        | top                       |
 * | tabbarLayout               |                        |                           |
 * | tabSubPages                |                        | true                      |
 *
**/
export declare class Config {
    private _c;
    private _s;
    /**
     * @private
     */
    platform: Platform;
    constructor(config?: any);
    /**
     * @name get
     * @description
     * Returns a single config value, given a key.
     *
     * @param {string} [key] - the key for the config value
     * @param {any} [fallbackValue] - a fallback value to use when the config
     * value was not found, or is config value is `null`. Fallback value
     *  defaults to `null`.
     */
    get(key: string, fallbackValue?: any): any;
    /**
     * @name getBoolean
     * @description
     * Same as `get()`, however always returns a boolean value. If the
     * value from `get()` is `null`, then it'll return the `fallbackValue`
     * which defaults to `false`. Otherwise, `getBoolean()` will return
     * if the config value is truthy or not. It also returns `true` if
     * the config value was the string value `"true"`.
     * @param {string} [key] - the key for the config value
     * @param {boolean} [fallbackValue] - a fallback value to use when the config
     * value was `null`. Fallback value defaults to `false`.
     */
    getBoolean(key: string, fallbackValue?: boolean): boolean;
    /**
     * @name getNumber
     * @description
     * Same as `get()`, however always returns a number value. Uses `parseFloat()`
     * on the value received from `get()`. If the result from the parse is `NaN`,
     * then it will return the value passed to `fallbackValue`. If no fallback
     * value was provided then it'll default to returning `NaN` when the result
     * is not a valid number.
     * @param {string} [key] - the key for the config value
     * @param {number} [fallbackValue] - a fallback value to use when the config
     * value turned out to be `NaN`. Fallback value defaults to `NaN`.
     */
    getNumber(key: string, fallbackValue?: number): number;
    /**
     * @name set
     * @description
     * Sets a single config value.
     *
     * @param {string} [platform] - The platform (either 'ios' or 'android') that the config value should apply to. Leaving this blank will apply the config value to all platforms.
     * @param {string} [key] - The key used to look up the value at a later point in time.
     * @param {string} [value] - The config value being stored.
     */
    set(...args: any[]): this;
    /**
     * @private
     * @name settings()
     * @description
     */
    settings(arg0?: any, arg1?: any): any;
    /**
     * @private
     */
    setPlatform(platform: any): void;
    /**
     * @private
     */
    static setModeConfig(mode: any, config: any): void;
    /**
     * @private
     */
    static getModeConfig(mode: any): any;
}
