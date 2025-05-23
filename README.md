![OnScroll Detection](https://coderesolution.com/misc/onscroll.jpg)

# Onscroll Detection

Onscroll Detection enables the creation of powerful GSAP animations using custom `data-onscroll-*` attributes in the DOM. It leverages GSAP and ScrollTrigger to easily create scroll-based parallax animations, custom transforms, progressive animations, and more.

[Walk-through video](https://cloud.cdrs.dev/h6BvSP9P)

<a href="https://www.npmjs.com/package/onscroll-detection"><img src="https://img.shields.io/npm/v/onscroll-detection?color=red" alt="NPM Version"></a>
<a href="LICENCE"><img src="https://img.shields.io/github/license/coderesolution/onscroll-detection?color=orange" alt="Licence"></a>
<img src="https://img.shields.io/bundlephobia/min/onscroll-detection?color=green" alt="Bundle file size">
<img src="https://img.shields.io/bundlephobia/minzip/onscroll-detection?color=yellow&label=gzip%20size" alt="Bundle file size (gzip)">

## Features

-   Bind animations to any trigger element.
-   Manipulate classes based on scroll events.
-   Trigger callbacks on specific events.
-   Supports both vertical and horizontal directions with the ability to reverse.
-   Control animation through specific px values, from and to attributes, modify scroll speed, or automatically calculate distance based on parent.
-   Create custom animations such as rotation, skewing, colour changes, and more.
-   Target specific screen sizes for adaptive animations.
-   Built-in debugging mode.
-   Lightweight (~2.71 kB Brotli).

## Dependencies

Please ensure the following dependencies are installed and properly registered:

-   [GSAP v3](https://greensock.com/gsap/)
-   [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)

## Quick start

Onscroll Detection requires GSAP and ScrollTrigger plugin to work. Both must be included **before** Onscroll Detection and registered within the instantiation.

#### Install from NPM

```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OnscrollDetection from 'onscroll-detection'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Initialise OnscrollDetection and pass in gsap and ScrollTrigger
const onscroll = new OnscrollDetection(
	{
		/* options */
	},
	gsap,
	ScrollTrigger,
)
```

##### Delayed start (recommended)

To initialise the module without starting it right-away, set `autoStart` option to `false`.

```js
// Create instance but do not start automatically
const onscroll = new OnscrollDetection(
	{
		autoStart: false,
	},
	gsap,
	ScrollTrigger,
)

// Start it when you are ready
document.addEventListener('DOMContentLoaded', () => {
	onscroll.start()
})
```

With `autoStart` disabled, for extra clarity `onscroll.register` can be used to register `gsap` and `ScrollTrigger` outside of the instantiation.

```js
// Standard
const onscroll = new OnscrollDetection(
	{
		autoStart: false,
	},
	gsap,
	ScrollTrigger,
)
```

Optionally may be replaced with:

```js
const onscroll = new OnscrollDetection({
	autoStart: false,
})

// Register gsap and ScrollTrigger separately
onscroll.register(gsap, ScrollTrigger)
```

#### Install from CDN

If you prefer to use a CDN, here is an example:

```html
<!-- Include GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js"></script>

<!-- Include OnscrollDetection -->
<script src="https://cdn.jsdelivr.net/npm/onscroll-detection/bundled/index.min.js"></script>

<script>
	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger)

	// Initialise OnscrollDetection and pass in gsap and ScrollTrigger
	const onscroll = new OnscrollDetection(
		{
			/* options */
		},
		gsap,
		ScrollTrigger,
	)
</script>
```

Depending on your CDN of choice:

-   jsDelivr (https://cdn.jsdelivr.net/npm/onscroll-detection/bundled/index.min.js)
-   unpkg (https://unpkg.com/onscroll-detection/bundled/index.min.js)
-   cdnjs: ([coming soon](https://github.com/cdnjs/packages/issues/1696)):

## Options

You can configure Onscroll Detection via options:

```js
const onscroll = new OnscrollDetection(
	{
		elements: '[data-onscroll]',
		autoStart: true,
		screen: '(min-width: 1025px)',
		scrollingClass: 'is-scrolling',
		scrolledClass: 'has-scrolled',
		stickyClass: 'is-sticky',
		stuckClass: 'has-stuck',
		debug: false,
	},
	gsap,
	ScrollTrigger,
)
```

All options:

| Name             |  Type  |         Default         | Description                                                                                                                          |
| :--------------- | :----: | :---------------------: | :----------------------------------------------------------------------------------------------------------------------------------- |
| `elements`       | `str`  |    `[data-onscroll]`    | What elements to apply onscroll animations to.                                                                                       |
| `autoStart`      | `bool` |         `true`          | Whether to start immedietely. Set to `false` for a delayed start (recommended).                                                      |
| `screen`         | `str`  | `'(min-width: 1025px)'` | Specify media query rules for animations. This can be overwritten on a per animation-basis. Set to `all` to remove queries entirely. |
| `startPosition`  | `str`  |    `'top bottom'`     | Global default start position for all animations. Can be overridden per element using `data-onscroll-start`.                        |
| `endPosition`    | `str`  |    `'bottom top'`     | Global default end position for all animations. Can be overridden per element using `data-onscroll-end`.                            |
| `scrollingClass` | `str`  |    `'is-scrolling'`     | The class that is temporarily assigned to elements when they are within the viewport.                                                |
| `scrolledClass`  | `str`  |    `'has-scrolled'`     | The class that is permanently assigned to element when they have been within viewport.                                               |
| `stickyClass`    | `str`  |     `'has-sticky'`      | The class that is temporarily assigned to sticky element set by `[data-onscroll-sticky]` when they are within the viewport.          |
| `stuckClass`     | `str`  |      `'has-stuck'`      | The class that is permanently assigned to sticky element set by `[data-onscroll-sticky]` when they have been within the viewport.    |
| `debug`          | `bool` |          false          | Set debug mode to all instances. Enables markers and console logs.                                                                   |

## Attributes

Apply any of the following data attributes in conjunction with `[data-onscroll]` to enable custom animations.

-   [debug](#debug)
-   [offset](#offset)
-   [delay](#delay)
-   [preset](#preset)
-   [auto](#auto)
-   [reverse](#reverse)
-   [speed](#speed)
-   [direction](#direction)
-   [trigger](#trigger)
-   [sticky](#sticky)
-   [start](#start)
-   [end](#end)
-   [screen](#screen)
-   [from / to](#fromto)
-   [call](#call)
-   [progress](#progress)

### Debug

Attribute: `data-onscroll-debug`
Default: `Not set`

Displays visible GSAP markers and console logs useful information.

```html
<div data-onscroll data-onscroll-debug></div>
```

### Offset

Attribute: `data-onscroll-offset`
Default: `0,0`
Type: x2 comma separated values (`int|str,int|str`)

Apply before and after offsets. This settings expects two comma-separated multipurpose values, like `100,-100`. The first value applies an initial offset at the beginning of the animation. The second value is the target offset.

###### px values or percentages

Integers default to px values, inclusion of `%` will set as a percentage value. Percentage values are based on the element height.

###### Recommended: Preset

Combine with `data-onscroll-preset` (see [preset](#preset)) to automatically update the `start` (see [start](#start)) and `end` (see [end](#end) values for seamless offset animations.

###### Sticky elements

If `data-inview-sticky` (see [sticky](#sticky)) is set, the first value adds top padding for a late stick and the second value adds a bottom padding for an earlier unstick.

```html
<div data-onscroll data-onscroll-offset="-100,0"><!-- From -100px to 0 --></div>
<div data-onscroll data-onscroll-offset="-100,100"><!-- From -100px to 100px --></div>
<div data-onscroll data-onscroll-offset="0,100"><!-- From 0 to 100px --></div>
<div data-onscroll data-onscroll-offset="100,0"><!-- From 100px to 0 --></div>
<div data-onscroll data-onscroll-offset="100,-100"><!-- From 100px to -100px --></div>

<div data-onscroll data-onscroll-offset="-50px,10%"><!-- From -50px to 10% of element height --></div>
<div data-onscroll data-onscroll-offset="-5%,5%"><!-- From -5% to 5% of element height --></div>
```

### Delay

Attribute: `data-onscroll-delay`
Default: `0`
Type: `int` (number)

Apply a lag/lerp effect to delay an element's response to the user's scrolling. The value represents the duration (in seconds) of the animation (e.g., `2` for two seconds).

Note: To be used only in conjunction with offset animations, however, distances may not be completely accurate when a delay is used.

```html
<div data-onscroll data-onscroll-offset="0,100" data-onscroll-delay="1"><!-- 1 second to catch up --></div>
<div data-onscroll data-onscroll-offset="0,100" data-onscroll-delay="1.5"><!-- 1.5 seconds to catch up --></div>
<div data-onscroll data-onscroll-offset="0,100" data-onscroll-delay="2"><!-- 2 seconds to catch up --></div>
```

_offset in the above example is for illustrative purposes_

### Preset

Attribute: `data-onscroll-preset`
Default: `false`
Type: Toggle (no value)

Automatically adjust `start` and `end` values based on `offset` settings to eliminate the need for complex values like `data-onscroll-start="top bottom+=200"` (see [start](#start) and [end](#end) ).

Note: If the offset value exceeds `0`, the start will be where the original element was before offset is applied. This avoids a jump as it comes into view.

Only to be used with `data-onscroll-offset` (see [offset](#offset). This has no effect on `speed` (see [speed](#speed)) as that is calculated independently.

```html
<div data-onscroll data-onscroll-offset="-100,100" data-onscroll-preset><!-- From -100px to 0 with preset --></div>
```

_offset in the above example is for illustrative purposes_

### Auto

Attribute: `data-onscroll-auto`
Default: Not set
Type: Toggle (no value)

Achieve a parallax effect by automatically applying offset/distance if an element exceeds the height of the parent container or defined trigger (see [trigger](#trigger).

This is best used for creating parallax effects to contained images or backgrounds.

```html
<figure>
	<img src="" alt="" data-onscroll data-onscroll-auto />
</figure>

<figure>
	<img src="" alt="" data-onscroll data-onscroll-auto data-onscroll-reverse />
</figure>
```

_reverse in the above example is for illustrative purposes_

### Reverse

Attribute: `data-onscroll-reverse`
Default: Not set
Type: Toggle (no value)

Reverse the direction when combined with `data-onscroll-auto` ([auto](#auto)).

This has no effect on the offset or speed setting.

```html
<!-- Reverse -->
<figure>
	<img src="" alt="" data-onscroll data-onscroll-auto data-onscroll-reverse />
</figure>
```

### Speed

Attribute: `data-onscroll-speed`
Default: Not set
Type: x2 comma separated values (`int,int`)

Instead of using precise pixel or percentage values with an offset animation, use a speed effect. This setting requires two comma-separated values, such as `1.5,10`. The offset animation is applied by multiplying the height of the element (first value) and adding the percentage value of the viewport height (second value). For instance, `1.5,10` represents (1.5 times the element height) plus (10% of the viewport height). Therefore, `data-onscroll-speed="1,0"` is equivalent to `data-onscroll-offset="0,100%"`. Negative values are also accepted to reverse the direction.

```html
<div data-onscroll data-onscroll-speed="0,10"><!-- Down 10% viewport --></div>
<div data-onscroll data-onscroll-speed="1,10"><!-- Down x1 + 10% viewport --></div>
<div data-onscroll data-onscroll-speed="-.5,0"><!-- Up x0.5 --></div>
```

### Direction

Attribute: `data-onscroll-direction`
Default: `'y'`
Type: `string`

Change direction of the animation.

Only the following values will be accepted:
| Direction | Value | Description |
| :--------: | :---: | :----------------------------------------------------------------------------------------: |
| Vertical | `y` | Defaults to down unless using reverse attribute or negative offset and speed values. |
| Horizontal | `x` | Defaults to right unless using reverse attribute or negative offset and speed values. |
| Both | `xy` | Defaults to down/right unless using reverse attribute or negative offset and speed values. |

```html
<div data-onscroll data-onscroll-offset="0,100" data-onscroll-direction="y"><!-- Vertical --></div>
<div data-onscroll data-onscroll-offset="0,100" data-onscroll-direction="x"><!-- Horizontal --></div>
<div data-onscroll data-onscroll-offset="0,100" data-onscroll-direction="xy"><!-- Both directions --></div>
```

_offset in the above example is for illustrative purposes_

### Trigger

Attribute: `data-onscroll-trigger`
Default: `this`
Type: `string` (DOM element by selectors, i.e. `#id`, `.class`)

Set an alternative element as the trigger instead of itself. Specificity is crucial to ensure only a single element is assigned.

```html
<div data-onscroll data-onscroll-target="#elementById"></div>
<div data-onscroll data-onscroll-target=".element-by-class"></div>
<div data-onscroll data-onscroll-target="body"></div>
<div data-onscroll data-onscroll-target="ul li:last-child"></div>
```

When using the Code Resolution boilerplate for WordPress, you can set the component as the target like so:
```php
echo "<div data-onscroll data-onscroll-target='#$id'></div>";
```

### Sticky

Attribute: `data-onscroll-sticky`
Default: Not set
Type: Toggle (no value)

Stick element to the `data-onscroll-trigger` element.

Combine with `data-onscroll-offset` (see [offset](#offset)) for early and late stick/unstick. The first value (top) adjusts the initial stick and the second value (bottom) adjusts unstick.

```html
<div data-onscroll data-onscroll-sticky data-onscroll-trigger="#stickyTrigger">
	<!-- Stick exactly to top/bottom of #stickyTrigger -->
</div>

<div data-onscroll data-onscroll-sticky data-onscroll-offset="50,100" data-onscroll-trigger="#stickyTrigger">
	<!-- Fix with 50px late stick and 100px early unstick -->
</div>
```

_offset in the above example is for illustrative purposes_

### Start

Attribute: `data-onscroll-start`
Default: `'top bottom'` or `'top top'` if [sticky](#sticky) is set
Type: `str`

Adjust the point when the animation begins. See [preset](#preset) for automatic detection with offsets.

The first value refers to the trigger and the second value refers to the viewport. Refer GSAP ScrollTrigger documentation for further information.

```html
<div data-onscroll data-onscroll-start="top bottom+=200">
	<!-- Start 200px after the bottom of the viewport reaches the top of the trigger -->
</div>

<div data-onscroll data-onscroll-start="center center">
	<!-- Start when the center of the viewport reaches the center of the trigger -->
</div>
```

### End

Attribute: `data-onscroll-end`
Default: `'bottom top'` or `bottom bottom` if [sticky](#sticky) is set
Type: `str`

Adjust the point when the animation ends. See [preset](#preset) for automatic detection with offsets.

The first value refers to the trigger and the second value refers to the viewport. Refer GSAP ScrollTrigger documentation for further information.

```html
<div data-onscroll data-onscroll-end="bottom top+=200">
	<!-- End 200px before the top of the viewport reaches the bottom of the trigger -->
</div>

<div data-onscroll data-onscroll-end="center center">
	<!-- End when the center of the viewport reaches the center of the trigger -->
</div>
```

### Screen

Attribute: `data-onscroll-screen`
Default: `'(min-width: 1025px)'` (configurable globally via [options](#options))
Type: `str`