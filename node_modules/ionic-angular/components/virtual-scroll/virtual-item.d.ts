import { TemplateRef, ViewContainerRef } from 'angular2/core';
/**
 * @private
 */
export declare class VirtualHeader {
    templateRef: TemplateRef;
    constructor(templateRef: TemplateRef);
}
/**
 * @private
 */
export declare class VirtualFooter {
    templateRef: TemplateRef;
    constructor(templateRef: TemplateRef);
}
/**
 * @private
 */
export declare class VirtualItem {
    templateRef: TemplateRef;
    viewContainer: ViewContainerRef;
    constructor(templateRef: TemplateRef, viewContainer: ViewContainerRef);
}
