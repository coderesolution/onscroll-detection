/**
 * Written by Elliott Mangham at Code Resolution.
 * Maintained by Code Resolution.
 * made@coderesolution.com
 */
export default class OnscrollDetection {
    constructor(options?: {}, gsap?: any, ScrollTrigger?: any);
    _gsap: any;
    _ScrollTrigger: any;
    elements: any;
    screen: any;
    triggers: Map<any, any>;
    debug: any;
    scrollingClass: any;
    scrolledClass: any;
    stickyClass: any;
    stuckClass: any;
    eventHandlers: {};
    autoStart: any;
    register(gsap: any, ScrollTrigger: any): void;
    init(): void;
    start(): void;
    on(event: any, handler: any): void;
    emit(event: any, ...args: any[]): void;
    getTrigger(element: any): any;
    getScreen(element: any): any;
    getFromProperties(element: any): any;
    getToProperties(element: any, index: any, trigger: any): any;
    getStickyProperties(element: any): {
        pin: boolean;
        pinSpacing: boolean;
    };
    hasAttributes(element: any, attrs: any): any;
    getAnimateFrom(element: any): any;
    getAnimateTo(element: any): any;
    getOffset(element: any): number;
    getDirection(element: any): any;
    getX(element: any): number;
    getY(element: any): number;
    getOffsetAndDistance(element: any): {
        offset: number;
        distance: number;
    };
    getDistanceOrSpeed(element: any): number;
    getScrub(element: any): number | true;
    getStart(element: any): any;
    getEnd(element: any): any;
    debugMode(element: any, index: any): void;
    fetch(elementOrIndex: any): any;
    refresh(): void;
    restart(): void;
    stop(target?: any): void;
    update(target: any, fromProperties: any, toProperties: any): void;
    destroy(): void;
}
