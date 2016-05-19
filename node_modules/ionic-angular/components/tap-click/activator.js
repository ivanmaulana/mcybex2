"use strict";
var dom_1 = require('../../util/dom');
var Activator = (function () {
    function Activator(app, config, _zone) {
        this.app = app;
        this._zone = _zone;
        this._queue = [];
        this._active = [];
        this._css = config.get('activatedClass') || 'activated';
    }
    Activator.prototype.downAction = function (ev, activatableEle, pointerX, pointerY) {
        // the user just pressed down
        var self = this;
        if (self.disableActivated(ev)) {
            return;
        }
        // queue to have this element activated
        self._queue.push(activatableEle);
        this._zone.runOutsideAngular(function () {
            dom_1.rafFrames(2, function () {
                var activatableEle;
                for (var i = 0; i < self._queue.length; i++) {
                    activatableEle = self._queue[i];
                    if (activatableEle && activatableEle.parentNode) {
                        self._active.push(activatableEle);
                        activatableEle.classList.add(self._css);
                    }
                }
                self._queue = [];
            });
        });
    };
    Activator.prototype.upAction = function (ev, activatableEle, pointerX, pointerY) {
        // the user was pressing down, then just let up
        var self = this;
        function activateUp() {
            self.clearState();
        }
        this._zone.runOutsideAngular(function () {
            dom_1.rafFrames(CLEAR_STATE_DEFERS, activateUp);
        });
    };
    Activator.prototype.clearState = function () {
        var _this = this;
        // all states should return to normal
        if (!this.app.isEnabled()) {
            // the app is actively disabled, so don't bother deactivating anything.
            // this makes it easier on the GPU so it doesn't have to redraw any
            // buttons during a transition. This will retry in XX milliseconds.
            setTimeout(function () {
                _this.clearState();
            }, 600);
        }
        else {
            // not actively transitioning, good to deactivate any elements
            this.deactivate();
        }
    };
    Activator.prototype.deactivate = function () {
        // remove the active class from all active elements
        var self = this;
        self._queue = [];
        dom_1.rafFrames(2, function () {
            for (var i = 0; i < self._active.length; i++) {
                self._active[i].classList.remove(self._css);
            }
            self._active = [];
        });
    };
    Activator.prototype.disableActivated = function (ev) {
        if (ev.defaultPrevented)
            return true;
        var targetEle = ev.target;
        for (var x = 0; x < 4; x++) {
            if (!targetEle)
                break;
            if (targetEle.hasAttribute('disable-activated'))
                return true;
            targetEle = targetEle.parentElement;
        }
        return false;
    };
    return Activator;
}());
exports.Activator = Activator;
var CLEAR_STATE_DEFERS = 5;
