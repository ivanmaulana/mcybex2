"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var view_controller_1 = require('../nav/view-controller');
var animation_1 = require('../../animations/animation');
var transition_1 = require('../../transitions/transition');
/**
 * @name Modal
 * @description
 * A Modal is a content pane that goes over the user's current page.
 * Usually it is used for making a choice or editing an item. A modal uses the
 * `NavController` to
 * {@link /docs/v2/api/components/nav/NavController/#present present}
 * itself in the root nav stack. It is added to the stack similar to how
 * {@link /docs/v2/api/components/nav/NavController/#push NavController.push}
 * works.
 *
 * When a modal (or any other overlay such as an alert or actionsheet) is
 * "presented" to a nav controller, the overlay is added to the app's root nav.
 * After the modal has been presented, from within the component instance The
 * modal can later be closed or "dismissed" by using the ViewController's
 * `dismiss` method. Additionally, you can dismiss any overlay by using `pop`
 * on the root nav controller.
 *
 * Data can be passed to a new modal through `Modal.create()` as the second
 * argument. The data can gen be accessed from the opened page by injecting
 * `NavParams`. Note that the page, which opened as a modal, has no special
 * "modal" logic within it, but uses `NavParams` no differently than a
 * standard page.
 *
 * @usage
 * ```ts
 * import {Page, Modal, NavController, NavParams} from 'ionic-angular';
 *
 * @Page(...)
 * class HomePage {
 *
 *  constructor(nav: NavController) {
 *    this.nav = nav;
 *  }
 *
 *  presentProfileModal() {
 *    let profileModal = Modal.create(Profile, { userId: 8675309 });
 *    this.nav.present(profileModal);
 *  }
 *
 * }
 *
 * @Page(...)
 * class Profile {
 *
 *  constructor(params: NavParams) {
 *    console.log('UserId', params.get('userId'));
 *  }
 *
 * }
 * ```
 *
 * A modal can also emit data, which is useful when it is used to add or edit
 * data. For example, a profile page could slide up in a modal, and on submit,
 * the submit button could pass the updated profile data, then dismiss the
 * modal.
 *
 * ```ts
 * import {Page, Modal, NavController, ViewController} from 'ionic-angular';
 *
 * @Page(...)
 * class HomePage {
 *
 *  constructor(nav: NavController) {
 *    this.nav = nav;
 *  }
 *
 *  presentContactModal() {
 *    let contactModal = Modal.create(ContactUs);
 *    this.nav.present(contactModal);
 *  }
 *
 *  presentProfileModal() {
 *    let profileModal = Modal.create(Profile, { userId: 8675309 });
 *    profileModal.onDismiss(data => {
 *      console.log(data);
 *    });
 *    this.nav.present(profileModal);
 *  }
 *
 * }
 *
 * @Page(...)
 * class Profile {
 *
 *  constructor(viewCtrl: ViewController) {
 *    this.viewCtrl = viewCtrl;
 *  }
 *
 *  dismiss() {
 *    let data = { 'foo': 'bar' };
 *    this.viewCtrl.dismiss(data);
 *  }
 *
 * }
 * ```
 * @demo /docs/v2/demos/modal/
 * @see {@link /docs/v2/components#modals Modal Component Docs}
 */
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal(componentType, data) {
        if (data === void 0) { data = {}; }
        _super.call(this, componentType, data);
        this.viewType = 'modal';
        this.isOverlay = true;
    }
    /**
    * @private
    */
    Modal.prototype.getTransitionName = function (direction) {
        var key = (direction === 'back' ? 'modalLeave' : 'modalEnter');
        return this._nav && this._nav.config.get(key);
    };
    /**
     * @param {any} componentType Modal
     * @param {object} data Modal options
     */
    Modal.create = function (componentType, data) {
        if (data === void 0) { data = {}; }
        return new Modal(componentType, data);
    };
    return Modal;
}(view_controller_1.ViewController));
exports.Modal = Modal;
/**
 * Animations for modals
 */
var ModalSlideIn = (function (_super) {
    __extends(ModalSlideIn, _super);
    function ModalSlideIn(enteringView, leavingView, opts) {
        _super.call(this, opts);
        this
            .element(enteringView.pageRef())
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .duration(400)
            .fromTo('translateY', '100%', '0%')
            .before.addClass('show-page');
        if (enteringView.hasNavbar()) {
            // entering page has a navbar
            var enteringNavBar = new animation_1.Animation(enteringView.navbarRef());
            enteringNavBar.before.addClass('show-navbar');
            this.add(enteringNavBar);
        }
    }
    return ModalSlideIn;
}(transition_1.Transition));
transition_1.Transition.register('modal-slide-in', ModalSlideIn);
var ModalSlideOut = (function (_super) {
    __extends(ModalSlideOut, _super);
    function ModalSlideOut(enteringView, leavingView, opts) {
        _super.call(this, opts);
        this
            .element(leavingView.pageRef())
            .easing('ease-out')
            .duration(250)
            .fromTo('translateY', '0%', '100%');
    }
    return ModalSlideOut;
}(transition_1.Transition));
transition_1.Transition.register('modal-slide-out', ModalSlideOut);
var ModalMDSlideIn = (function (_super) {
    __extends(ModalMDSlideIn, _super);
    function ModalMDSlideIn(enteringView, leavingView, opts) {
        _super.call(this, opts);
        this
            .element(enteringView.pageRef())
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .duration(280)
            .fromTo('translateY', '40px', '0px')
            .fadeIn()
            .before.addClass('show-page');
        if (enteringView.hasNavbar()) {
            // entering page has a navbar
            var enteringNavBar = new animation_1.Animation(enteringView.navbarRef());
            enteringNavBar.before.addClass('show-navbar');
            this.add(enteringNavBar);
        }
    }
    return ModalMDSlideIn;
}(transition_1.Transition));
transition_1.Transition.register('modal-md-slide-in', ModalMDSlideIn);
var ModalMDSlideOut = (function (_super) {
    __extends(ModalMDSlideOut, _super);
    function ModalMDSlideOut(enteringView, leavingView, opts) {
        _super.call(this, opts);
        this
            .element(leavingView.pageRef())
            .duration(200)
            .easing('cubic-bezier(0.47,0,0.745,0.715)')
            .fromTo('translateY', '0px', '40px')
            .fadeOut();
    }
    return ModalMDSlideOut;
}(transition_1.Transition));
transition_1.Transition.register('modal-md-slide-out', ModalMDSlideOut);
