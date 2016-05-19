import { ElementRef } from 'angular2/core';
import { List } from '../list/list';
/**
 * @name ItemSliding
 *
 * @description
 * Creates a list-item that can easily be swiped, deleted, reordered, edited, and more.
 *
 * @usage
 * ```html
 * <ion-list>
 *   <ion-item-sliding *ngFor="#item of items">
 *     <button ion-item (click)="itemTapped(item)">
 *       {{item.title}}
 *     </button>
 *     <ion-item-options>
 *       <button (click)="favorite(item)">Favorite</button>
 *       <button (click)="share(item)">Share</button>
 *     </ion-item-options>
 *   </ion-item-sliding>
 * </ion-list>
 * ```
 * @demo /docs/v2/demos/item-sliding/
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @see {@link ../../list/List List API Docs}
 */
export declare class ItemSliding {
    private _list;
    constructor(_list: List, elementRef: ElementRef);
    /**
     * @private
     */
    close(): void;
}
