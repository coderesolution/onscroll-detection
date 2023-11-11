(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.OnscrollDetection = factory());
})(this, (function () {
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  /**
   * Written by Elliott Mangham at Code Resolution.
   * Maintained by Code Resolution.
   * made@coderesolution.com
   */
  var OnscrollDetection = /*#__PURE__*/function () {
    function OnscrollDetection(options, gsap, ScrollTrigger) {
      if (options === void 0) {
        options = {};
      }
      if (gsap === void 0) {
        gsap = null;
      }
      if (ScrollTrigger === void 0) {
        ScrollTrigger = null;
      }
      // Set dependencies
      this._gsap = gsap;
      this._ScrollTrigger = ScrollTrigger;

      // Initialise class properties with default values or provided options
      this.elements = options.elements || '[data-onscroll]';
      this.screen = options.screen || '(min-width: 1025px)';
      this.triggers = new Map();
      this.debug = options.debug || false;

      // Set class names to defaults or provided options
      this.scrollingClass = options.scrollingClass || 'is-scrolling';
      this.scrolledClass = options.scrolledClass || 'has-scrolled';
      this.stickyClass = options.stickyClass || 'is-sticky';
      this.stuckClass = options.stuckClass || 'has-stuck';

      // Initialise event handlers
      this.eventHandlers = {};

      // Set autoStart to true by default, or use provided value
      this.autoStart = options.autoStart !== undefined ? options.autoStart : true;

      // Initialise the class
      if (this.autoStart) {
        this.init();
      }
    }

    // Register GSAP and plugins
    var _proto = OnscrollDetection.prototype;
    _proto.register = function register(gsap, ScrollTrigger) {
      this._gsap = gsap;
      this._ScrollTrigger = ScrollTrigger;
    }

    // Initialisation function
    ;
    _proto.init = function init() {
      var _this = this;
      // Check if gsap is registered
      if (this._gsap === null || this._gsap === undefined) {
        console.log('GSAP is not registered. Exiting');
        return;
      }

      // Check if ScrollTrigger is registered
      if (this._ScrollTrigger === null || this._ScrollTrigger === undefined) {
        console.log('ScrollTrigger is not registered. Exiting');
        return;
      }
      try {
        // Convert elements to an array and loop through each
        this._gsap.utils.toArray(this.elements).forEach(function (element, index) {
          // Get the trigger element
          var trigger = _this.getTrigger(element);

          // Get the screen media query
          var screen = _this.getScreen(element);

          // Create a matchMedia instance
          var matchMedia = _this._gsap.matchMedia();

          // Get the animation properties for 'from' state
          var fromProperties = _this.getFromProperties(element);
          fromProperties.startAt = {
            backgroundColor: 'red'
          };
          fromProperties.immediateRender = true;

          // Get the animation properties for 'to' state
          var toProperties = _this.getToProperties(element, index, trigger);

          // Add the animation to the matchMedia instance and store the ScrollTrigger instance
          matchMedia.add(screen, function () {
            var gsapAnimation = _this._gsap.fromTo(element, fromProperties, toProperties);
            _this.triggers.set(gsapAnimation.scrollTrigger, {
              element: element,
              fromProperties: fromProperties,
              toProperties: toProperties,
              gsapAnimation: gsapAnimation
            });
          });

          // Enable debug mode for logging
          _this.debugMode(element, index);
        });
      } catch (error) {
        // Catch and log any errors
        console.error('Error initialising OnscrollDetection:', error);
      }
    }

    // Function to load and initialize the class
    ;
    _proto.start = function start() {
      // Initialize the class
      this.init();
    }

    // Events
    ;
    _proto.on = function on(event, handler) {
      if (!this.eventHandlers[event]) {
        this.eventHandlers[event] = [];
      }
      this.eventHandlers[event].push(handler);
    };
    _proto.emit = function emit(event) {
      var _arguments = arguments;
      if (this.eventHandlers[event]) {
        this.eventHandlers[event].forEach(function (handler) {
          return handler.apply(void 0, [].slice.call(_arguments, 1));
        });
      }
    }

    // Get the trigger element for ScrollTrigger
    ;
    _proto.getTrigger = function getTrigger(element) {
      if (this.hasAttributes(element, ['data-onscroll-auto']) && !element.hasAttribute('data-onscroll-trigger')) {
        // If data-onscroll-auto is present and data-onscroll-trigger is not, use the parent element as the trigger
        return element.parentElement;
      } else if (element.hasAttribute('data-onscroll-trigger')) {
        // If data-onscroll-trigger is present, try to find the DOM element specified by the attribute
        var triggerElement = document.querySelector(element.dataset.onscrollTrigger);
        if (triggerElement) {
          return triggerElement;
        } else {
          console.error("Element specified by data-onscroll-trigger not found: " + element.dataset.onscrollTrigger);
          return element;
        }
      } else {
        // Otherwise, use the element itself as the trigger
        return element;
      }
    }

    // Get the screen media query
    ;
    _proto.getScreen = function getScreen(element) {
      return element.hasAttribute('data-onscroll-screen') ? element.dataset.onscrollScreen : this.screen;
    }

    // Get the animation properties for 'from' state
    ;
    _proto.getFromProperties = function getFromProperties(element) {
      var animateFrom = this.getAnimateFrom(element);
      var _this$getOffsetAndDis = this.getOffsetAndDistance(element),
        offset = _this$getOffsetAndDis.offset;
      return _extends({}, animateFrom, {
        bottom: this.hasAttributes(element, ['data-onscroll-auto', 'data-onscroll-reverse']) ? 'auto' : null,
        top: this.hasAttributes(element, ['data-onscroll-auto']) && !this.hasAttributes(element, ['data-onscroll-reverse']) ? 'auto' : null,
        x: this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'x' || this.getDirection(element) === 'xy') ? offset : null,
        y: !this.hasAttributes(element, ['data-onscroll-direction']) || this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'y' || this.getDirection(element) === 'xy') ? offset : null
      });
    }

    // Get the animation properties for 'to' state
    ;
    _proto.getToProperties = function getToProperties(element, index, trigger) {
      var _this2 = this;
      var animateTo = this.getAnimateTo(element);
      var stickyProperties = this.getStickyProperties(element);
      var isSticky = this.hasAttributes(element, ['data-onscroll-sticky']);
      var customEventName = element.getAttribute('data-onscroll-call');
      var progressEventName = element.getAttribute('data-onscroll-progress');

      // Helper function to dispatch the custom event
      var dispatchCustomEvent = function dispatchCustomEvent(when, direction) {
        if (customEventName) {
          window.dispatchEvent(new CustomEvent(customEventName, {
            detail: {
              target: element,
              direction: direction === 1 ? 'down' : 'up',
              when: when
            }
          }));
        }
      };

      // Helper function to dispatch progress event
      var dispatchProgressEvent = function dispatchProgressEvent(progress, direction) {
        if (progressEventName) {
          window.dispatchEvent(new CustomEvent(progressEventName, {
            detail: {
              element: element,
              progress: progress,
              direction: direction === 1 ? 'down' : 'up'
            }
          }));
        }
      };
      return _extends({}, animateTo, {
        x: this.getX(element),
        y: this.getY(element),
        ease: 'none',
        scrollTrigger: {
          trigger: isSticky ? element : trigger,
          start: this.getStart(element),
          end: this.getEnd(element),
          invalidateOnRefresh: true,
          pin: stickyProperties.pin,
          pinSpacing: stickyProperties.pinSpacing,
          scrub: this.getScrub(element),
          markers: this.hasAttributes(element, ['data-onscroll-debug']),
          onUpdate: function onUpdate(self) {
            var progress = self.progress.toFixed(2);
            element.style.setProperty('--onscrollProgress', progress);
            if (progressEventName) {
              dispatchProgressEvent(progress, self.direction);
            }
          },
          onToggle: function onToggle(self) {
            if (!self.isActive) {
              element.style.setProperty('--onscrollProgress', 0);
            }
          },
          onEnter: function onEnter(_ref) {
            var direction = _ref.direction;
            element.classList.add(_this2.scrollingClass, _this2.scrolledClass);
            if (isSticky) {
              element.classList.add(_this2.stickyClass, _this2.stuckClass);
            }
            dispatchCustomEvent('onEnter', direction);
            _this2.emit('onEnter', element);
          },
          onLeave: function onLeave(_ref2) {
            var direction = _ref2.direction;
            element.classList.remove(_this2.scrollingClass);
            if (isSticky) {
              element.classList.remove(_this2.stickyClass);
            }
            dispatchCustomEvent('onLeave', direction);
            _this2.emit('onLeave', element);
          },
          onEnterBack: function onEnterBack(_ref3) {
            var direction = _ref3.direction;
            element.classList.add(_this2.scrollingClass);
            if (isSticky) {
              element.classList.add(_this2.stickyClass);
            }
            dispatchCustomEvent('onEnterBack', direction);
            _this2.emit('onEnterBack', element);
          },
          onLeaveBack: function onLeaveBack(_ref4) {
            var direction = _ref4.direction;
            element.classList.remove(_this2.scrollingClass);
            if (isSticky) {
              element.classList.remove(_this2.stickyClass);
            }
            dispatchCustomEvent('onLeaveBack', direction);
            _this2.emit('onLeaveBack', element);
          }
        }
      });
    }

    // Get the sticky properties for ScrollTrigger animation
    ;
    _proto.getStickyProperties = function getStickyProperties(element) {
      if (element.hasAttribute('data-onscroll-sticky')) {
        return {
          pin: true,
          pinSpacing: false
        };
      } else {
        return {
          pin: false,
          pinSpacing: true
        };
      }
    }

    // Check if an element has all the specified attributes
    ;
    _proto.hasAttributes = function hasAttributes(element, attrs) {
      return attrs.every(function (attr) {
        return element.hasAttribute(attr);
      });
    }

    // Get the animation properties for 'from' state
    ;
    _proto.getAnimateFrom = function getAnimateFrom(element) {
      return element.hasAttribute('data-onscroll-from') ? JSON.parse(element.dataset.onscrollFrom) : [];
    }

    // Get the animation properties for 'to' state
    ;
    _proto.getAnimateTo = function getAnimateTo(element) {
      return element.hasAttribute('data-onscroll-to') ? JSON.parse(element.dataset.onscrollTo) : [];
    }

    // Get the offset value
    ;
    _proto.getOffset = function getOffset(element) {
      return element.hasAttribute('data-onscroll-offset') ? parseInt(element.dataset.onscrollOffset) : null;
    }

    // Get the scroll direction
    ;
    _proto.getDirection = function getDirection(element) {
      return element.dataset.onscrollDirection ? element.dataset.onscrollDirection : 'y';
    }

    // Get the 'x' value for ScrollTrigger animation
    ;
    _proto.getX = function getX(element) {
      if (element.hasAttribute('data-onscroll-sticky')) {
        return null;
      }
      if (this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'x' || this.getDirection(element) === 'xy')) {
        return this.getDistanceOrSpeed(element);
      }
    }

    // Get the 'y' value for ScrollTrigger animation
    ;
    _proto.getY = function getY(element) {
      if (element.hasAttribute('data-onscroll-sticky')) {
        return null;
      }
      if (!this.hasAttributes(element, ['data-onscroll-direction']) || this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'y' || this.getDirection(element) === 'xy')) {
        return this.getDistanceOrSpeed(element);
      }
    }

    // Get the offset and distance values
    ;
    _proto.getOffsetAndDistance = function getOffsetAndDistance(element) {
      // Check if the element has the data-onscroll-sticky attribute
      if (element.hasAttribute('data-onscroll-sticky')) {
        return {
          offset: null,
          distance: null
        };
      }
      var offset = null;
      var distance = null;
      var triggerElement = this.getTrigger(element);
      var triggerHeight = triggerElement.offsetHeight;
      if (element.hasAttribute('data-onscroll-offset')) {
        var _element$dataset$onsc = element.dataset.onscrollOffset.split(','),
          offsetValue = _element$dataset$onsc[0],
          distanceValue = _element$dataset$onsc[1];

        // If the offset value ends with a '%', calculate it as a percentage of the trigger height
        if (offsetValue.trim().endsWith('%')) {
          var offsetPercentage = parseFloat(offsetValue) / 100;
          offset = offsetPercentage * triggerHeight;
        } else {
          offset = parseFloat(offsetValue);
        }

        // If the distance value ends with a '%', calculate it as a percentage of the trigger height
        if (distanceValue.trim().endsWith('%')) {
          var distancePercentage = parseFloat(distanceValue) / 100;
          distance = distancePercentage * triggerHeight;
        } else {
          distance = parseFloat(distanceValue);
        }
      }
      return {
        offset: offset,
        distance: distance
      };
    }

    // Get the distance or speed value for ScrollTrigger animation
    ;
    _proto.getDistanceOrSpeed = function getDistanceOrSpeed(element) {
      var _this$getOffsetAndDis2 = this.getOffsetAndDistance(element),
        distance = _this$getOffsetAndDis2.distance;
      var viewportHeight = window.innerHeight;
      var scrollSpeed = element.dataset.onscrollSpeed;
      var additionalDistance = 0;

      // Check if there are two values
      if (scrollSpeed && scrollSpeed.includes(',')) {
        var _scrollSpeed$split$ma = scrollSpeed.split(',').map(parseFloat),
          speed = _scrollSpeed$split$ma[0],
          percentage = _scrollSpeed$split$ma[1];

        // Update the scrollSpeed and calculate the additional distance
        scrollSpeed = speed;
        additionalDistance = percentage / 100 * viewportHeight;

        // If scrollSpeed is negative, subtract the additional distance
        if (scrollSpeed < 0) {
          additionalDistance *= -1;
        }
      } else {
        scrollSpeed = parseFloat(scrollSpeed || '0');
      }
      if (this.hasAttributes(element, ['data-onscroll-auto'])) {
        var triggerElement = this.getTrigger(element);
        var autoDistance = Math.abs(triggerElement.offsetHeight - element.offsetHeight);
        return this.hasAttributes(element, ['data-onscroll-reverse']) ? -autoDistance : autoDistance;
      } else if (this.hasAttributes(element, ['data-onscroll-speed'])) {
        var elementHeight = element.offsetHeight;
        var scrollDistance = scrollSpeed * elementHeight + additionalDistance;
        return scrollDistance;
      } else if (distance !== null) {
        return distance;
      }
    }

    // Get the delay value which controls the scrub setting
    ;
    _proto.getScrub = function getScrub(element) {
      if (this.hasAttributes(element, ['data-onscroll-delay'])) {
        return parseInt(element.dataset.onscrollDelay);
      } else {
        return true; // Default scrub value if no 'data-onscroll-delay' attribute is present
      }
    }

    // Get the start value for ScrollTrigger animation
    ;
    _proto.getStart = function getStart(element) {
      if (element.hasAttribute('data-onscroll-sticky')) {
        var stickyOffset = 0;
        if (element.hasAttribute('data-onscroll-offset')) {
          var _element$dataset$onsc2 = element.dataset.onscrollOffset.split(','),
            offsetValue = _element$dataset$onsc2[0];
          stickyOffset = parseFloat(offsetValue);
        }
        return (element.dataset.onscrollStart ? element.dataset.onscrollStart : 'top top') + '+=' + stickyOffset;
      } else if (this.hasAttributes(element, ['data-onscroll-preset', 'data-onscroll-offset']) && this.getDirection(element) !== 'x' && !this.hasAttributes(element, ['data-onscroll-start', 'data-onscroll-sticky'])) {
        var _element$dataset$onsc3 = element.dataset.onscrollOffset.split(','),
          _offsetValue = _element$dataset$onsc3[0];
        var positionElement = parseFloat(_offsetValue) < 0 ? 'top+=' + _offsetValue : 'top+=0';
        var positionMarker = 'bottom';
        return positionElement + ' ' + positionMarker;
      } else {
        return element.dataset.onscrollStart ? element.dataset.onscrollStart : 'top bottom';
      }
    }

    // Get the end value for ScrollTrigger animation
    ;
    _proto.getEnd = function getEnd(element) {
      if (element.hasAttribute('data-onscroll-sticky')) {
        var trigger = this.getTrigger(element);
        var stickyOffset = 0;
        if (element.hasAttribute('data-onscroll-offset')) {
          var _element$dataset$onsc4 = element.dataset.onscrollOffset.split(','),
            distanceValue = _element$dataset$onsc4[1];
          stickyOffset = parseFloat(distanceValue);
        }
        var stickyDistance = trigger.clientHeight - element.clientHeight - stickyOffset;
        return element.dataset.onscrollEnd ? element.dataset.onscrollEnd : '+=' + stickyDistance;
      } else if (this.hasAttributes(element, ['data-onscroll-speed']) && !element.hasAttribute('data-onscroll-end')) {
        var scrollDistance = this.getDistanceOrSpeed(element);
        return "bottom" + (scrollDistance >= 0 ? '+=' : '-=') + Math.abs(scrollDistance) + " top";
      } else if (this.hasAttributes(element, ['data-onscroll-preset', 'data-onscroll-offset']) && this.getDirection(element) !== 'x' && !this.hasAttributes(element, ['data-onscroll-end', 'data-onscroll-sticky'])) {
        var _element$dataset$onsc5 = element.dataset.onscrollOffset.split(','),
          _distanceValue = _element$dataset$onsc5[1];
        var positionElement = 'bottom+=' + _distanceValue;
        var positionMarker = 'top';
        return positionElement + ' ' + positionMarker;
      } else {
        return element.dataset.onscrollEnd ? element.dataset.onscrollEnd : 'bottom top';
      }
    }

    // Enable debug mode for logging
    ;
    _proto.debugMode = function debugMode(element, index) {
      if (!this.debug && !this.hasAttributes(element, ['data-onscroll-debug'])) return;
      var _this$getOffsetAndDis3 = this.getOffsetAndDistance(element),
        offset = _this$getOffsetAndDis3.offset;
      var speedMultiplier = 0;
      var speedViewportPercentage = 0;
      if (this.hasAttributes(element, ['data-onscroll-speed'])) {
        var speedValues = element.dataset.onscrollSpeed.split(',');
        speedMultiplier = parseFloat(speedValues[0]);
        speedViewportPercentage = parseFloat(speedValues[1]);

        // Provide defaults in case parsing failed
        speedMultiplier = isNaN(speedMultiplier) ? 0 : speedMultiplier;
        speedViewportPercentage = isNaN(speedViewportPercentage) ? 0 : speedViewportPercentage;
      }
      var attrs = element.dataset;
      var hasSpeed = this.hasAttributes(element, ['data-onscroll-speed']);
      var hasPreset = this.hasAttributes(element, ['data-onscroll-preset']);
      var hasSticky = this.hasAttributes(element, ['data-onscroll-sticky']);
      var hasReverse = this.hasAttributes(element, ['data-onscroll-reverse']);
      console.group("OnscrollDetection() debug instance (#" + (index + 1) + ")");
      console.log({
        element: element,
        trigger: this.getTrigger(element),
        triggerStart: this.getStart(element),
        triggerEnd: this.getEnd(element),
        auto: this.hasAttributes(element, ['data-onscroll-auto']),
        offsetBefore: offset,
        offsetAfter: this.getDistanceOrSpeed(element),
        delay: this.getScrub(element),
        screen: this.getScreen(element),
        speed: hasSpeed ? parseFloat(speedMultiplier * element.clientHeight + speedViewportPercentage / 100 * window.innerHeight) + " (" + parseFloat(speedMultiplier) + "x element height + " + parseFloat(speedViewportPercentage) + "% of the viewport height)" : null,
        direction: this.hasAttributes(element, ['data-onscroll-direction']) ? attrs.onscrollDirection : 'y',
        preset: hasPreset,
        reverse: hasReverse,
        sticky: hasSticky,
        animateFrom: this.getAnimateFrom(element),
        animateTo: this.getAnimateTo(element),
        customEvent: this.hasAttributes(element, ['data-onscroll-call']) ? attrs.onscrollCall : null
      });
      var warnings = [{
        condition: this.hasAttributes(element, ['data-onscroll-offset']) && hasSpeed,
        message: '`offset` and `speed` should not be used together'
      }, {
        condition: hasPreset && (this.hasAttributes(element, ['data-onscroll-start']) || this.hasAttributes(element, ['data-onscroll-end'])),
        message: '`preset` should not be used in conjunction with `start` or `end` settings'
      }, {
        condition: hasSticky && hasSpeed,
        message: '`sticky` should not be used in conjunction with `speed`'
      }, {
        condition: hasSticky && this.hasAttributes(element, ['data-onscroll-offset']) && this.hasAttributes(element, ['data-onscroll-end']),
        message: 'Your bottom `offset` will be ignored due to custom `end` on the `sticky` element'
      }, {
        condition: hasReverse && (!this.hasAttributes(element, ['data-onscroll-auto']) || this.hasAttributes(element, ['data-onscroll-offset']) || hasSticky || hasSpeed),
        message: '`reverse` is not compatible with `offset`, `speed` or `sticky` and should only be used in conjunction with `auto`'
      }, {
        condition: hasSpeed && hasPreset,
        message: '`preset` has no effect in conjunction with `speed` setting'
      }, {
        condition: this.getDirection(element) === 'x' && hasPreset,
        message: '`preset` has no effect in conjunction with `x` direction'
      }];
      warnings.forEach(function (warning) {
        return warning.condition && console.warn(warning.message);
      });
      console.groupEnd();
    }

    // Fetch a trigger
    ;
    _proto.fetch = function fetch(elementOrIndex) {
      if (typeof elementOrIndex === 'number') {
        // Treat argument as an index
        var keys = Array.from(this.triggers.keys());
        return keys[elementOrIndex];
      } else {
        // Assume argument is a DOM element
        var trigger = null;
        this.triggers.forEach(function (value, key) {
          if (value.element === elementOrIndex) {
            trigger = key;
          }
        });
        return trigger;
      }
    }

    // Refresh ScrollTrigger instances
    ;
    _proto.refresh = function refresh() {
      this._ScrollTrigger.refresh();

      // Emit event after refresh is done
      this.emit('refresh');
    }

    // Restart the animations and reinitialize the ScrollTrigger instances
    ;
    _proto.restart = function restart() {
      // Stop the current animations and remove ScrollTriggers
      this.stop();

      // Kill all existing ScrollTrigger instances
      this._ScrollTrigger.getAll().forEach(function (trigger) {
        return trigger.kill();
      });

      // Refresh ScrollTrigger
      this._ScrollTrigger.refresh();

      // Reapply animations and initialize ScrollTrigger
      this.init();

      // Emit event after restart is done
      this.emit('restart');
    }

    // Stop animations and ScrollTriggers
    ;
    _proto.stop = function stop(target) {
      if (target === void 0) {
        target = null;
      }
      if (target) {
        // Stop animation and remove the ScrollTrigger for a specific target
        var animationData = this.triggers.get(target);
        if (animationData) {
          animationData.gsapAnimation.kill();
          this.triggers["delete"](target);
        }
      } else {
        // Stop all animations and clear the ScrollTrigger instances
        this.triggers.forEach(function (_ref5) {
          var gsapAnimation = _ref5.gsapAnimation;
          gsapAnimation.kill();
        });
        this.triggers.clear();
      }

      // Emit event after stop is done
      this.emit('stop', target);
    }

    // Update animation for a specific target with new fromProperties and toProperties
    ;
    _proto.update = function update(target, fromProperties, toProperties) {
      var animationData = this.triggers.get(target);
      if (animationData) {
        // Stop the existing animation
        animationData.gsapAnimation.kill();

        // Reinitialize the animation with updated properties
        var gsapAnimation = this._gsap.fromTo(animationData.element, fromProperties, toProperties);

        // Create new ScrollTrigger for the updated animation
        var trigger = this._ScrollTrigger.create({
          animation: gsapAnimation,
          trigger: this.getTrigger(animationData.element),
          start: this.getStart(animationData.element),
          end: this.getEnd(animationData.element),
          scrub: this.getScrub(animationData.element)
        });

        // Save the updated animation data
        this.triggers.set(target, _extends({}, animationData, {
          fromProperties: fromProperties,
          toProperties: toProperties,
          gsapAnimation: gsapAnimation,
          trigger: trigger
        }));
      }
    }

    // Destroy the OnscrollDetection instance
    ;
    _proto.destroy = function destroy() {
      // Stop all animations and clear the ScrollTrigger instances
      this.stop();
      this.triggers = null;
    };
    return OnscrollDetection;
  }();

  return OnscrollDetection;

}));
