# OnscrollDetection.js

OnscrollDetection.js is a powerful JavaScript library that provides robust features to create parallax animations based on scroll detection. Powered by GSAP, it offers various customisable options for creating dynamic and interactive user experiences.

## Features

-   Bind animations to any trigger element.
-   Manipulate classes based on scroll events.
-   Trigger callbacks on specific events.
-   Supports both vertical and horizontal directions with the ability to reverse.
-   Control animation through specific px values, from and to attributes, modify scroll speed, or automatically calculate parallax based on parent.
-   Create custom animations such as rotation, skewing, colour changes, and more.
-   Target specific screen sizes for adaptive animations.
-   Built-in debugging mode.
-   Lightweight, even with dependencies (~2.19Kb gzipped).

## Dependencies

Please ensure the following dependencies are installed and properly configured:

-   [GSAP v3](https://greensock.com/gsap/)
-   [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)

## Quick start

### Installation

OnscrollDetection.js requires the GSAP library and ScrollTrigger for operation. Make sure to include them before OnscrollDetection.js.

#### Boilerplate

Our [Boilerplate](https://github.com/coderesolution/boilerplate) includes the OnscrollDetection.min.js file.

#### Use from CDN

```html
<!-- Include GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js"></script>

<!-- Include OnscrollDetection -->
<script src="https://cdn.jsdelivr.net/gh/coderesolution/OnscrollDetection.js/bundled/OnscrollDetection.min.js"></script>

<script>
	// Register GSAP
	gsap.registerPlugin(ScrollTrigger)

	// Initialise OnscrollDetection
	const onscroll = new OnscrollDetection(/*options*/)
</script>
```

If you wish to initialise the module but not start it yet, set `autoStart` option to false.

```html
<script>
	// Create instance but do not start automatically
	const onscroll = new OnscrollDetection({
		autoStart: false,
	})

	// Start it when you are ready
	document.addEventListener('DOMContentLoaded', (event) => {
		onscroll.start()
	})
</script>
```

#### Install NPM module

```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OnscrollDetection from './path-to/OnscrollDetection'

// Register GSAP
gsap.registerPlugin(ScrollTrigger)

// Initialise OnscrollDetection
const onscroll = new OnscrollDetection(/*options*/)
```

## Default Options

You can configure OnscrollDetection.js via options:

```js
const onscroll = new OnscrollDetection({
	elements: '[data-onscroll]',
	autoStart: true,
	screen: '(min-width: 1025px)',
	scrollingClass: 'is-scrolling',
	scrolledClass: 'has-scrolled',
	stickyClass: 'is-sticky',
	stuckClass: 'has-stuck',
	debug: false,
})
```

| Name             |  Type   |         Default         | Description                                                                                                            |
| :--------------- | :-----: | :---------------------: | :--------------------------------------------------------------------------------------------------------------------- |
| `elements`       | String  |    `[data-onscroll]`    | What elements to apply onscroll animations to.                                                                         |
| `autoStart`      | Boolean |         `true`          | Whether to start immedietely.                                                                                          |
| `screen`         | String  | `'(min-width: 1025px)'` | Specify media queries to be affected. This can be over-ruled on a per animation-basis. Set to `all` to remove queries. |
| `scrollingClass` | String  |    `'is-scrolling'`     | The class that is temporarily assigned to elements when they are in view.                                              |
| `scrolledClass`  | String  |    `'has-scrolled'`     | The class that is permanently assigned to element when they have been in view.                                         |
| `stickyClass`    | String  |     `'has-sticky'`      | The class that is temporarily assigned to sticky element set by `[data-onscroll-sticky]` when they are in view.        |
| `stuckClass`     | String  |      `'has-stuck'`      | The class that is permanently assigned to sticky element set by `[data-onscroll-sticky]` when they have been in view.  |
| `debug`          | Boolean |          false          | Set debug mode to all instances.                                                                                       |

## Instructions

### Usage

Apply any of the following to a `[data-onscroll]` element to apply custom animations and settings:

| Name                      |  Type   |                              Default                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------------ | :-----: | :----------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-onscroll-debug`     |         |                              Not set                               | Enable debug mode to output helpful developer information and GSAP markers.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `data-onscroll-auto`      |         |                              Not set                               | Achieve a parallax effect by automatically applying offset/distance if the element exceeds the height of the trigger (or parent container by default).                                                                                                                                                                                                                                                                                                                                 |
| `data-onscroll-offset`    | String  |                               `0,0`                                | Apply before and after offsets. This settings expects two comma-separated multipurpose values, like `100,-100`. The first sets an offset at the beginning of the animation and the second is the target offset. They can integers to assume px values or percentages `%`. Note percentage values are based on the element height. If `data-inview-sticky` is set, the first value adds top padding for a late stick and the second value adds a bottom padding for an earlier unstick. |
| `data-onscroll-preset`    |         |                              `false`                               | Automatically adjust start/bottom based on `offset` settings to eliminate the need for complex settings like `data-onscroll-start="top bottom+=200"`. Note: If you set an offset above 0, the auto setting will set the starting point to where the original element was before offset is applied. This avoids a jump as it comes into view. This has no effect on `speed` as that calculates independently.                                                                           |
| `data-onscroll-delay`     | Integer |                                `0`                                 | Apply a lag/lerp effect where the element has to catch up with user's scroll speed. The value is the time (in seconds) it takes before an animation completes (i.e. `2` is two seconds).                                                                                                                                                                                                                                                                                               |
| `data-onscroll-speed`     | String  |                              Not set                               | Apply a speed effect. This settings expects two comma-separated values, i.e. `1.5,10`. Applies an offset animation by multiplying the height of the element (first value) and then adding the percentage value of the viewport height (second value). For example, `1.5,10%` is (1.5x element height) + (10% of viewport height), so `data-onscroll-speed="1,0"` would be the same as `data-onscroll-offset="0,100%"`                                                                  |
| `data-onscroll-reverse`   |         |                              Not set                               | Reverse the direction when combined with `data-onscroll-auto`. Note this has no effect on the offset or speed setting.                                                                                                                                                                                                                                                                                                                                                                 |
| `data-onscroll-direction` | String  |                               `'y'`                                | Animate offsets vertically (`y`) or horizontally (`x`) or both directions (`xy`).                                                                                                                                                                                                                                                                                                                                                                                                      |
| `data-onscroll-trigger`   | String  |                               `this`                               | Attach ScrollTrigger to another DOM element instead of itself.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `data-onscroll-sticky`    |         |                              Not set                               | Stick the element to the `data-onscroll-trigger` element. Note: the `data-onscroll-offset` attribute can be used to apply top/bottom padding for a late stick and the second value adds a bottom padding for an earlier unstick.                                                                                                                                                                                                                                                       |
| `data-onscroll-start`     | String  | `'top bottom'` or `'top top'` if `data-onscroll-sticky` is enabled | Adjust the point when the animation begins.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `data-onscroll-end`       | String  |      `'bottom top'` unless `data-onscroll-sticky` is enabled       | Adjust the point when the animation ends. Note: accepts `window.innerHeight` to utilise the viewport height.                                                                                                                                                                                                                                                                                                                                                                           |
| `data-onscroll-screen`    | String  |                      `'(min-width: 1025px)'`                       | Set screen size conditions, i.e. to only animate on desktop and not mobile, or vice-versa. Expects media queries like `(min-width: 500px)` or `(min-width: 768px) and (max-width: 1000px)` etc. Set to `all` to animate on all screen sizes.                                                                                                                                                                                                                                           |
| `data-onscroll-from`      |  JSON   |                              Not set                               | Customise the animate from setting. This sets `gsap.from()` properties and therefore expects JSON format, i.e. `{"backgroundColor": "#fff", "rotation": "0"}`.                                                                                                                                                                                                                                                                                                                         |
| `data-onscroll-to`        |  JSON   |                              Not set                               | Customise the animate to setting. This sets `gsap.to()` properties and therefore expects JSON format, i.e. `{"backgroundColor": "red", "rotation": "5"}`.                                                                                                                                                                                                                                                                                                                              |
| `data-onscroll-call`      | String  |                              Not set                               | Fire custom events when elements enter, re-enter, leave or re-leave the viewport and use data such as the element and scroll direction. Example: `data-onscroll-call="scrollEvent"`.                                                                                                                                                                                                                                                                                                   |
| `data-onscroll-progress`  | String  |                              Not set                               | When set a CSS variable `--onscrollProgress` will be declared to the element. This variable represents the current progress of the element between start and end, ranging between `0` and `1`. You can also listen for a custom event that includes the percentage, element and scroll direction. Example: `data-onscroll-progress="progressEvent"`.                                                                                                                                   |

### Methods

#### Start

Start animations. Should be used if `autoStart` is set to `false`.

```js
onscroll.start()
```

#### Refresh

Update ScrollTrigger calculations.

```js
onscroll.refresh()
```

#### Fetch

Return the ScrollTrigger instance of a particular DOM element or iteration. Useful for stopping a particular animation.

```js
// Fetch by DOM element
const element = document.querySelector('#myElement') // change #myElement to appropriate element
const trigger = onscroll.fetch(element)
onscroll.fetch(element)

// Fetch by index
const trigger = onscroll.fetch(0) // change 0 with the element index
onscroll.fetch(trigger)
```

#### Stop

Stops all animations and remove the ScrollTrigger instances. If a specific target is passed, it will only stop the specified animation and remove the ScrollTrigger for that particular target.

```js
/* Stop all animations */
onscroll.stop()

/* Stop a specific animation */
onscroll.stop(trigger) // Use onscroll.fetch() to get a trigger
```

#### Restart

Stop and restart animations.

```js
onscroll.restart()
```

### Classes

| Class          | Application                                                                                         |
| :------------- | :-------------------------------------------------------------------------------------------------- |
| `is-scrolling` | Temporarily assigned to elements when they are in view.                                             |
| `has-scrolled` | Permanently assigned to element when they have been in view.                                        |
| `is-sticky`    | Temporarily assigned to sticky element set by `[data-onscroll-sticky]` when they are in view.       |
| `has-stuck`    | Permanently assigned to sticky element set by `[data-onscroll-sticky]` when they have been in view. |

The application remains the same even if the classes have been changed from their default setting.

### Events

#### Element enter/leave the viewport

Detect when a animation (re)fires from a particular direction.

```js
onscroll.on('onEnter', (element) => {
	console.log('Entering top of view:', element)
})
onscroll.on('onLeave', (element) => {
	console.log('Leaving bottom of view:', element)
})
onscroll.on('onEnterBack', (element) => {
	console.log('Entering bottom of view:', element)
})
onscroll.on('onLeaveBack', (element) => {
	console.log('Leaving top of view:', element)
})
```

#### Refresh

Detect when the `onscroll.refresh()` method is fired.

```js
onscroll.on('refresh', () => {
	console.log('Refreshed')
})
```

#### Stop

Detect when the `onscroll.stop()` method is fired.

```js
onscroll.on('stop', (target) => {
	console.log('Stopped', target)
})
```

#### Restart

Detect when the `onscroll.restart()` method is fired.

```js
onscroll.on('restart', () => {
	console.log('Restarted')
})
```

#### Update

Adjust the onscroll to and from properties applied to an element.

```js
const elementToStop = document.querySelector('#myElement')
const triggerToStop = onscroll.fetch(elementToStop)
onscroll.update(
	triggerToStop,
	{ color: 'red', opacity: 1, scale: 1, rotate: 0, margin: 0 },
	{ color: 'blue', opacity: 0, scale: 1.15, rotate: 180, margin: '0 0.25em' }
)
```

### Custom Callbacks

#### Events

Fire custom events when elements enter or leave the viewport.

```html
<div data-onscroll data-onscroll-call="scrollEvent">Trigger</div>
```

```js
window.addEventListener('scrollEvent', (e) => {
	const { target, direction, when } = e.detail
	console.log(`target: ${target}`, `direction: ${direction}`, `when: ${when}`)
})
```

### Progress

If a value is set, i.e. `data-onscroll-progress="progressEvent"` then trigger the custom event.

```html
<div data-onscroll data-onscroll-progress="progressEvent">Track Progress</div>
```

```js
window.addEventListener('progressEvent', (e) => {
	const { element, progress, direction } = e.detail
	console.log(`element: ${element}`, `progress: ${progress}`, `direction: ${direction}`)
})
```

## Examples of use

-   [Code Resolution](https://coderesolution.com/): Digital agency partner.
-   [Enumera Molecular](#): Coming soon.
-   [Stairwell](#): Coming soon.
-   [US Foot & Ankle Specialists](#): Coming soon.

## License

[The MIT License (MIT)](LICENSE)
