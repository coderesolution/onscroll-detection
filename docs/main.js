/* Lib */
import OnscrollDetection from '../src/index'

/* Demo CSS */
import './index.css'

/* Register GSAP and plugins */
gsap.registerPlugin(ScrollTrigger)

/* Lenis smooth scroll */
const lenis = new Lenis()
//lenis.on('scroll', (e) => { console.log(e) })

function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

/* Initialise OnscrollDetection.js */
const onscroll = new OnscrollDetection({
	scrollingClass: 'custom-scrolling',
	scrolledClass: 'custom-scrolled',
	stickyClass: 'custom-sticky',
	stuckClass: 'custom-stuck',
}, gsap, ScrollTrigger)

// const onscroll = new OnscrollDetection({
// 	scrollingClass: 'custom-scrolling',
// 	scrolledClass: 'custom-scrolled',
// 	stickyClass: 'custom-sticky',
// 	stuckClass: 'custom-stuck',
// 	autoStart: false
// })
// onscroll.register(gsap, ScrollTrigger)

/* Buttons */
const oButtons = document.querySelectorAll('.js-button')

const elementToStop = document.querySelector('#myElement')
const triggerToStop = onscroll.fetch(elementToStop)

oButtons.forEach((oButton) => {
	oButton.addEventListener('click', (e) => {
		e.preventDefault()

		switch (oButton.dataset.method) {
			case 'refresh':
				onscroll.refresh()
				break

			case 'stop':
				onscroll.stop(triggerToStop)
				break

			case 'restart':
				onscroll.restart()
				break

			case 'update':

				let elementToStopOriginal = JSON.parse(elementToStop.dataset.onscrollTo);

				elementToStopOriginal.rotate = 180;
				elementToStopOriginal.color = 'blue';

				onscroll.update(
					triggerToStop,
					{ color: 'red', opacity: 1, scale: 1, rotate: 0, margin: 0 },
					elementToStopOriginal
				)
				break

			default:
				console.log('No method')
		}
	})
})

// document.addEventListener('DOMContentLoaded', (event) => {
// 	onscroll.start()
// })

/* Event listeners */
// onscroll.on('onEnter', (element) => {
// 	console.log('Entering top of view:', element)
// })
// onscroll.on('onLeave', (element) => {
// 	console.log('Leaving bottom of view:', element)
// })
// onscroll.on('onEnterBack', (element) => {
// 	console.log('Entering bottom of view:', element)
// })
// onscroll.on('onLeaveBack', (element) => {
// 	console.log('Leaving top of view:', element)
// })
onscroll.on('refresh', () => {
	console.log('Refreshed')
})
onscroll.on('restart', () => {
	console.log('Restarted')
})
onscroll.on('stop', (target) => {
	console.log('Stopped', target)
})

// window.addEventListener('progressEvent', (e) => {
// 	const { element, progress, direction } = e.detail;
// 	console.log(`element: ${element}`, `progress: ${progress}`, `direction: ${direction}`);
// });

/* Custom functions */
window.addEventListener('scrollEventDemo', (e) => {
	const { target, direction, when } = e.detail
	console.log(`target: ${target}`, `direction: ${direction}`, `when: ${when}`)
})
