"use strict";
var dom_1 = require('../util/dom');
var util_1 = require('../util/util');
/**
 * @private
 **/
var Animation = (function () {
    function Animation(ele, opts) {
        if (opts === void 0) { opts = {}; }
        this._wChg = false;
        this._rv = false;
        this._lastUpd = 0;
        this.isPlaying = false;
        this.hasTween = false;
        this.hasCompleted = false;
        this._reset();
        this.element(ele);
        this._opts = util_1.assign({
            renderDelay: 24
        }, opts);
    }
    Animation.prototype._reset = function () {
        this._el = [];
        this._c = [];
        this._fx = {};
        this._bfSty = {};
        this._bfAdd = [];
        this._bfRmv = [];
        this._afSty = {};
        this._afAdd = [];
        this._afRmv = [];
        this._pFns = [];
        this._fFns = [];
        this._fOnceFns = [];
        this._easing = this._dur = null;
    };
    Animation.prototype.element = function (ele) {
        var i;
        if (ele) {
            if (Array.isArray(ele)) {
                for (i = 0; i < ele.length; i++) {
                    this._addEle(ele[i]);
                }
            }
            else if (typeof ele === 'string') {
                ele = document.querySelectorAll(ele);
                for (i = 0; i < ele.length; i++) {
                    this._addEle(ele[i]);
                }
            }
            else {
                this._addEle(ele);
            }
        }
        return this;
    };
    Animation.prototype._addEle = function (ele) {
        if (ele.nativeElement) {
            ele = ele.nativeElement;
        }
        if (ele.nodeType === 1) {
            this._el.push(ele);
            // does this element suport will-change property?
            this._wChg = (typeof ele.style.willChange !== 'undefined');
        }
    };
    Animation.prototype.parent = function (parentAnimation) {
        this._parent = parentAnimation;
        return this;
    };
    Animation.prototype.add = function (childAnimation) {
        childAnimation.parent(this);
        this._c.push(childAnimation);
        return this;
    };
    Animation.prototype.getDuration = function () {
        return this._dur !== null ? this._dur : (this._parent && this._parent.getDuration()) || 0;
    };
    Animation.prototype.duration = function (milliseconds) {
        this._dur = milliseconds;
        return this;
    };
    Animation.prototype.getEasing = function () {
        return this._easing !== null ? this._easing : (this._parent && this._parent.getEasing()) || null;
    };
    Animation.prototype.easing = function (name) {
        this._easing = name;
        return this;
    };
    Animation.prototype.from = function (prop, val) {
        this._addProp('from', prop, val);
        return this;
    };
    Animation.prototype.to = function (prop, val, clearProperyAfterTransition) {
        var fx = this._addProp('to', prop, val);
        if (clearProperyAfterTransition) {
            // if this effect is a transform then clear the transform effect
            // otherwise just clear the actual property
            this.after.clearStyles([fx.trans ? dom_1.CSS.transform : prop]);
        }
        return this;
    };
    Animation.prototype.fromTo = function (prop, fromVal, toVal, clearProperyAfterTransition) {
        return this.from(prop, fromVal).to(prop, toVal, clearProperyAfterTransition);
    };
    Animation.prototype._addProp = function (state, prop, val) {
        var fxProp = this._fx[prop];
        if (!fxProp) {
            // first time we've see this EffectProperty
            fxProp = this._fx[prop] = {
                trans: (typeof TRANSFORMS[prop] !== 'undefined'),
                wc: ''
            };
            // add the will-change property fo transforms or opacity
            if (fxProp.trans) {
                fxProp.wc = dom_1.CSS.transform;
            }
            else if (prop === 'opacity') {
                fxProp.wc = prop;
            }
        }
        // add from/to EffectState to the EffectProperty
        var fxState = fxProp[state] = {
            val: val,
            num: null,
            unit: '',
        };
        if (typeof val === 'string' && val.indexOf(' ') < 0) {
            var r = val.match(CSS_VALUE_REGEX);
            var num = parseFloat(r[1]);
            if (!isNaN(num)) {
                fxState.num = num;
            }
            fxState.unit = (r[0] !== r[2] ? r[2] : '');
        }
        else if (typeof val === 'number') {
            fxState.num = val;
        }
        return fxProp;
    };
    Animation.prototype.fadeIn = function () {
        return this.fromTo('opacity', 0.001, 1, true);
    };
    Animation.prototype.fadeOut = function () {
        return this.fromTo('opacity', 0.999, 0);
    };
    Object.defineProperty(Animation.prototype, "before", {
        get: function () {
            var _this = this;
            return {
                addClass: function (className) {
                    _this._bfAdd.push(className);
                    return _this;
                },
                removeClass: function (className) {
                    _this._bfRmv.push(className);
                    return _this;
                },
                setStyles: function (styles) {
                    _this._bfSty = styles;
                    return _this;
                },
                clearStyles: function (propertyNames) {
                    for (var i = 0; i < propertyNames.length; i++) {
                        _this._bfSty[propertyNames[i]] = '';
                    }
                    return _this;
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "after", {
        get: function () {
            var _this = this;
            return {
                addClass: function (className) {
                    _this._afAdd.push(className);
                    return _this;
                },
                removeClass: function (className) {
                    _this._afRmv.push(className);
                    return _this;
                },
                setStyles: function (styles) {
                    _this._afSty = styles;
                    return _this;
                },
                clearStyles: function (propertyNames) {
                    for (var i = 0; i < propertyNames.length; i++) {
                        _this._afSty[propertyNames[i]] = '';
                    }
                    return _this;
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Animation.prototype.play = function (opts) {
        if (opts === void 0) { opts = {}; }
        var self = this;
        var i;
        var duration = util_1.isDefined(opts.duration) ? opts.duration : self._dur;
        void 0;
        // always default that an animation does not tween
        // a tween requires that an Animation class has an element
        // and that it has at least one FROM/TO effect
        // and that the FROM/TO effect can tween numeric values
        self.hasTween = false;
        self.hasCompleted = false;
        // fire off all the onPlays
        for (i = 0; i < self._pFns.length; i++) {
            self._pFns[i]();
        }
        self.isPlaying = true;
        // this is the top level animation and is in full control
        // of when the async play() should actually kick off
        // if there is no duration then it'll set the TO property immediately
        // if there is a duration, then it'll stage all animations at the
        // FROM property and transition duration, wait a few frames, then
        // kick off the animation by setting the TO property for each animation
        // stage all of the before css classes and inline styles
        // will recursively stage all child elements
        self._before();
        // ensure all past transition end events have been cleared
        self._clearAsync();
        if (duration > 30) {
            // this animation has a duration, so it should animate
            // place all the elements with their FROM properties
            // set the FROM properties
            self._progress(0);
            // add the will-change or translateZ properties when applicable
            self._willChg(true);
            // set the async TRANSITION END event
            // and run onFinishes when the transition ends
            self._asyncEnd(duration, true);
            // begin each animation when everything is rendered in their place
            // and the transition duration/easing is ready to go
            dom_1.rafFrames(self._opts.renderDelay / 16, function () {
                // there's been a moment and the elements are in place
                // now set the TRANSITION duration/easing
                self._setTrans(duration, false);
                // wait a few moments again to wait for the transition
                // info to take hold in the DOM
                dom_1.rafFrames(2, function () {
                    // browser had some time to render everything in place
                    // and the transition duration/easing is set
                    // now set the TO properties
                    // which will trigger the transition to begin
                    self._progress(1);
                });
            });
        }
        else {
            // this animation does not have a duration, so it should not animate
            // just go straight to the TO properties and call it done
            self._progress(1);
            // since there was no animation, immediately run the after
            self._after();
            // since there was no animation, it's done
            // fire off all the onFinishes
            self._didFinish(true);
        }
    };
    Animation.prototype.stop = function (opts) {
        if (opts === void 0) { opts = {}; }
        var self = this;
        var duration = util_1.isDefined(opts.duration) ? opts.duration : 0;
        var stepValue = util_1.isDefined(opts.stepValue) ? opts.stepValue : 1;
        // ensure all past transition end events have been cleared
        this._clearAsync();
        // set the TO properties
        self._progress(stepValue);
        if (duration > 30) {
            // this animation has a duration, so it should animate
            // place all the elements with their TO properties
            // now set the TRANSITION duration
            self._setTrans(duration, true);
            // set the async TRANSITION END event
            // and run onFinishes when the transition ends
            self._asyncEnd(duration, false);
        }
        else {
            // this animation does not have a duration, so it should not animate
            // just go straight to the TO properties and call it done
            self._after();
            // since there was no animation, it's done
            // fire off all the onFinishes
            self._didFinish(false);
        }
    };
    Animation.prototype._asyncEnd = function (duration, shouldComplete) {
        var self = this;
        function onTransitionEnd(ev) {
            void 0;
            // ensure transition end events and timeouts have been cleared
            self._clearAsync();
            // set the after styles
            self._after();
            // remove will change properties
            self._willChg(false);
            // transition finished
            self._didFinish(shouldComplete);
        }
        function onTransitionFallback() {
            void 0;
            // oh noz! the transition end event didn't fire in time!
            // instead the fallback timer when first
            // clear the other async end events from firing
            self._tmr = 0;
            self._clearAsync();
            // too late to have a smooth animation, just finish it
            self._setTrans(0, true);
            // ensure the ending progress step gets rendered
            self._progress(1);
            // set the after styles
            self._after();
            // remove will change properties
            self._willChg(false);
            // transition finished
            self._didFinish(shouldComplete);
        }
        // set the TRANSITION END event on one of the transition elements
        self._unregTrans = dom_1.transitionEnd(self._transEl(), onTransitionEnd);
        // set a fallback timeout if the transition end event never fires, or is too slow
        // transition end fallback: (animation duration + XXms)
        self._tmr = dom_1.nativeTimeout(onTransitionFallback, duration + 400);
    };
    Animation.prototype._clearAsync = function () {
        this._unregTrans && this._unregTrans();
        if (this._tmr) {
            clearTimeout(this._tmr);
            this._tmr = 0;
        }
    };
    Animation.prototype._progress = function (stepValue) {
        // bread 'n butter
        var i;
        var prop;
        var fx;
        var val;
        var transforms;
        var tweenEffect;
        for (i = 0; i < this._c.length; i++) {
            this._c[i]._progress(stepValue);
        }
        if (this._el.length) {
            // flip the number if we're going in reverse
            if (this._rv) {
                stepValue = ((stepValue * -1) + 1);
            }
            transforms = [];
            for (prop in this._fx) {
                fx = this._fx[prop];
                if (fx.from && fx.to) {
                    tweenEffect = (fx.from.num !== fx.to.num);
                    if (tweenEffect) {
                        this.hasTween = true;
                    }
                    if (stepValue === 0) {
                        // FROM
                        val = fx.from.val;
                    }
                    else if (stepValue === 1) {
                        // TO
                        val = fx.to.val;
                    }
                    else if (tweenEffect) {
                        // EVERYTHING IN BETWEEN
                        val = (((fx.to.num - fx.from.num) * stepValue) + fx.from.num) + fx.to.unit;
                    }
                    else {
                        val = null;
                    }
                    if (val !== null) {
                        if (fx.trans) {
                            transforms.push(prop + '(' + val + ')');
                        }
                        else {
                            for (i = 0; i < this._el.length; i++) {
                                this._el[i].style[prop] = val;
                            }
                        }
                    }
                }
            }
            // place all transforms on the same property
            if (transforms.length) {
                if (!this._wChg) {
                    // if the element doesn't support will-change
                    // then auto add translateZ for transform properties
                    transforms.push('translateZ(0px)');
                }
                for (i = 0; i < this._el.length; i++) {
                    this._el[i].style[dom_1.CSS.transform] = transforms.join(' ');
                }
            }
        }
    };
    Animation.prototype._setTrans = function (duration, forcedLinearEasing) {
        var i;
        var easing;
        // set the TRANSITION properties inline on the element
        for (i = 0; i < this._c.length; i++) {
            this._c[i]._setTrans(duration, forcedLinearEasing);
        }
        if (Object.keys(this._fx).length) {
            for (i = 0; i < this._el.length; i++) {
                // all parent/child animations should have the same duration
                this._el[i].style[dom_1.CSS.transitionDuration] = duration + 'ms';
                // each animation can have a different easing
                easing = (forcedLinearEasing ? 'linear' : this.getEasing());
                if (easing) {
                    this._el[i].style[dom_1.CSS.transitionTimingFn] = easing;
                }
            }
        }
    };
    Animation.prototype._willChg = function (addWillChange) {
        var i;
        var wc;
        var prop;
        for (i = 0; i < this._c.length; i++) {
            this._c[i]._willChg(addWillChange);
        }
        if (this._wChg) {
            wc = [];
            if (addWillChange) {
                for (prop in this._fx) {
                    if (this._fx[prop].wc !== '') {
                        wc.push(this._fx[prop].wc);
                    }
                }
            }
            for (i = 0; i < this._el.length; i++) {
                this._el[i].style['willChange'] = wc.join(',');
            }
        }
    };
    Animation.prototype._before = function () {
        // before the RENDER_DELAY
        // before the animations have started
        var i;
        var j;
        var prop;
        var ele;
        // stage all of the child animations
        for (i = 0; i < this._c.length; i++) {
            this._c[i]._before();
        }
        if (!this._rv) {
            for (i = 0; i < this._el.length; i++) {
                ele = this._el[i];
                // css classes to add before the animation
                for (j = 0; j < this._bfAdd.length; j++) {
                    ele.classList.add(this._bfAdd[j]);
                }
                // css classes to remove before the animation
                for (j = 0; j < this._bfRmv.length; j++) {
                    ele.classList.remove(this._bfRmv[j]);
                }
                // inline styles to add before the animation
                for (prop in this._bfSty) {
                    ele.style[prop] = this._bfSty[prop];
                }
            }
        }
    };
    Animation.prototype._after = function () {
        // after the animations have finished
        var i;
        var j;
        var prop;
        var ele;
        for (i = 0; i < this._c.length; i++) {
            this._c[i]._after();
        }
        for (i = 0; i < this._el.length; i++) {
            ele = this._el[i];
            // remove the transition duration/easing
            ele.style[dom_1.CSS.transitionDuration] = '';
            ele.style[dom_1.CSS.transitionTimingFn] = '';
            if (this._rv) {
                // finished in reverse direction
                // css classes that were added before the animation should be removed
                for (j = 0; j < this._bfAdd.length; j++) {
                    ele.classList.remove(this._bfAdd[j]);
                }
                // css classes that were removed before the animation should be added
                for (j = 0; j < this._bfRmv.length; j++) {
                    ele.classList.add(this._bfRmv[j]);
                }
                // inline styles that were added before the animation should be removed
                for (prop in this._bfSty) {
                    ele.style[prop] = '';
                }
            }
            else {
                // finished in forward direction
                // css classes to add after the animation
                for (j = 0; j < this._afAdd.length; j++) {
                    ele.classList.add(this._afAdd[j]);
                }
                // css classes to remove after the animation
                for (j = 0; j < this._afRmv.length; j++) {
                    ele.classList.remove(this._afRmv[j]);
                }
                // inline styles to add after the animation
                for (prop in this._afSty) {
                    ele.style[prop] = this._afSty[prop];
                }
            }
        }
    };
    Animation.prototype.progressStart = function () {
        for (var i = 0; i < this._c.length; i++) {
            this._c[i].progressStart();
        }
        this._before();
        // force no duration, linear easing
        this._setTrans(0, true);
    };
    Animation.prototype.progressStep = function (stepValue) {
        var now = Date.now();
        // only update if the last update was more than 16ms ago
        if (now - 16 > this._lastUpd) {
            this._lastUpd = now;
            stepValue = Math.min(1, Math.max(0, stepValue));
            for (var i = 0; i < this._c.length; i++) {
                this._c[i].progressStep(stepValue);
            }
            if (this._rv) {
                // if the animation is going in reverse then
                // flip the step value: 0 becomes 1, 1 becomes 0
                stepValue = ((stepValue * -1) + 1);
            }
            this._progress(stepValue);
        }
    };
    Animation.prototype.progressEnd = function (shouldComplete, currentStepValue) {
        void 0;
        for (var i = 0; i < this._c.length; i++) {
            this._c[i].progressEnd(shouldComplete, currentStepValue);
        }
        // set all the animations to their final position
        this._progress(shouldComplete ? 1 : 0);
        // if it's already at the final position, or close, then it's done
        // otherwise we need to add a transition end event listener
        if (currentStepValue < 0.05 || currentStepValue > 0.95) {
            // the progress was already left off at the point that is finished
            // for example, the left menu was dragged all the way open already
            this._after();
            this._willChg(false);
            this._didFinish(shouldComplete);
        }
        else {
            // the stepValue was left off at a point when it needs to finish transition still
            // for example, the left menu was opened 75% and needs to finish opening
            this._asyncEnd(64, shouldComplete);
            // force quick duration, linear easing
            this._setTrans(64, true);
        }
    };
    Animation.prototype.onPlay = function (callback) {
        this._pFns.push(callback);
        return this;
    };
    Animation.prototype.onFinish = function (callback, onceTimeCallback, clearOnFinishCallacks) {
        if (onceTimeCallback === void 0) { onceTimeCallback = false; }
        if (clearOnFinishCallacks === void 0) { clearOnFinishCallacks = false; }
        if (clearOnFinishCallacks) {
            this._fFns = [];
            this._fOnceFns = [];
        }
        if (onceTimeCallback) {
            this._fOnceFns.push(callback);
        }
        else {
            this._fFns.push(callback);
        }
        return this;
    };
    Animation.prototype._didFinish = function (hasCompleted) {
        this.isPlaying = false;
        this.hasCompleted = hasCompleted;
        var i;
        for (i = 0; i < this._fFns.length; i++) {
            this._fFns[i](this);
        }
        for (i = 0; i < this._fOnceFns.length; i++) {
            this._fOnceFns[i](this);
        }
        this._fOnceFns = [];
    };
    Animation.prototype.reverse = function (shouldReverse) {
        if (shouldReverse === void 0) { shouldReverse = true; }
        for (var i = 0; i < this._c.length; i++) {
            this._c[i].reverse(shouldReverse);
        }
        this._rv = shouldReverse;
        return this;
    };
    Animation.prototype.destroy = function (removeElement) {
        var i;
        var ele;
        for (i = 0; i < this._c.length; i++) {
            this._c[i].destroy(removeElement);
        }
        if (removeElement) {
            for (i = 0; i < this._el.length; i++) {
                ele = this._el[i];
                ele.parentNode && ele.parentNode.removeChild(ele);
            }
        }
        this._clearAsync();
        this._reset();
    };
    Animation.prototype._transEl = function () {
        // get the lowest level element that has an Animation
        var i;
        var targetEl;
        for (i = 0; i < this._c.length; i++) {
            targetEl = this._c[i]._transEl();
            if (targetEl) {
                return targetEl;
            }
        }
        return (this.hasTween && this._el.length ? this._el[0] : null);
    };
    /*
     STATIC CLASSES
     */
    Animation.create = function (name, opts) {
        if (opts === void 0) { opts = {}; }
        var AnimationClass = AnimationRegistry[name];
        if (!AnimationClass) {
            // couldn't find an animation by the given name
            // fallback to just the base Animation class
            AnimationClass = Animation;
        }
        return new AnimationClass(null, opts);
    };
    Animation.register = function (name, AnimationClass) {
        AnimationRegistry[name] = AnimationClass;
    };
    return Animation;
}());
exports.Animation = Animation;
var TRANSFORMS = {
    'translateX': 1, 'translateY': 1, 'translateZ': 1,
    'scale': 1, 'scaleX': 1, 'scaleY': 1, 'scaleZ': 1,
    'rotate': 1, 'rotateX': 1, 'rotateY': 1, 'rotateZ': 1,
    'skewX': 1, 'skewY': 1, 'perspective': 1
};
var CSS_VALUE_REGEX = /(^-?\d*\.?\d*)(.*)/;
var AnimationRegistry = {};
