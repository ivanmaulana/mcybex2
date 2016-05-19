"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var animation_1 = require('../animations/animation');
var transition_1 = require('./transition');
var SHOW_BACK_BTN_CSS = 'show-back-button';
var SCALE_SMALL = .95;
var WPTransition = (function (_super) {
    __extends(WPTransition, _super);
    function WPTransition(enteringView, leavingView, opts) {
        _super.call(this, opts);
        // what direction is the transition going
        var backDirection = (opts.direction === 'back');
        // do they have navbars?
        var enteringHasNavbar = enteringView.hasNavbar();
        var leavingHasNavbar = leavingView && leavingView.hasNavbar();
        // entering content scale from smaller to larger
        var enteringPage = new animation_1.Animation(enteringView.pageRef());
        enteringPage.before.addClass('show-page');
        this.add(enteringPage);
        if (backDirection) {
            this.duration(opts.duration || 120).easing('cubic-bezier(0.47,0,0.745,0.715)');
            enteringPage.before.clearStyles(['scale']);
        }
        else {
            this.duration(opts.duration || 280).easing('cubic-bezier(0,0 0.05,1)');
            enteringPage
                .fromTo('scale', SCALE_SMALL, 1, true)
                .fadeIn();
        }
        if (enteringHasNavbar) {
            var enteringNavBar = new animation_1.Animation(enteringView.navbarRef());
            enteringNavBar.before.addClass('show-navbar');
            this.add(enteringNavBar);
            var enteringBackButton = new animation_1.Animation(enteringView.backBtnRef());
            this.add(enteringBackButton);
            if (enteringView.enableBack()) {
                enteringBackButton.before.addClass(SHOW_BACK_BTN_CSS);
            }
            else {
                enteringBackButton.before.removeClass(SHOW_BACK_BTN_CSS);
            }
        }
        // setup leaving view
        if (leavingView && backDirection) {
            // leaving content
            this.duration(opts.duration || 200).easing('cubic-bezier(0.47,0,0.745,0.715)');
            var leavingPage = new animation_1.Animation(leavingView.pageRef());
            this.add(leavingPage.fromTo('scale', 1, SCALE_SMALL).fadeOut());
        }
    }
    return WPTransition;
}(transition_1.Transition));
transition_1.Transition.register('wp-transition', WPTransition);
