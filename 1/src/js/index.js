import Lenis from '@studio-freight/lenis'
import { isInViewport } from './utils'
import { Preview } from './preview'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);
const ANIMATION_CONFIG = {duration: 1.5, ease: 'power4.inOut'}
const previewElms = [...document.querySelectorAll('.preview')]
const contentElms = [...document.querySelectorAll('.content')]
const previewItems = []
previewElms.forEach((elm, key) => { previewItems.push(new Preview(elm, contentElms[key])) })
const backButton = document.querySelector('.back-btn')

// Smooth Scroll Instance
let lenis

// To see if animating is in progress
let isAnimation = false

// Current item position
let currentPos = -1

const initSmoothScrolling = () => {

    console.log('e');

    lenis = new Lenis({
        duration: 1.2,
        smooth: true,
        direction: 'vertical'
    })

    const scrollFn = (time) => {
        lenis.raf(time)
        requestAnimationFrame(scrollFn)
    }

    requestAnimationFrame(scrollFn)

}

const animateOnScroll = () => {

	for (const item of previewItems) {
		
		item.scrollTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: item.DOM.elm,
				start: 'top bottom',
				end: 'bottom top',
				scrub: true
			}
		})
		.addLabel('start', 0)
		.to(item.DOM.title, {
			ease: 'none',
			yPercent: -100
		}, 'start')
        .to(item.DOM.imageInner, {
            ease: 'none',
            yPercent: 50
        }, 'start')

	}
}

const getAdjacentItems = item => {
	let arr = [];
	for (const [position, otherItem] of previewItems.entries()) {
		if ( item != otherItem && isInViewport(otherItem.DOM.elm) ) {
			arr.push({position: position, item: otherItem})
		}

	}
	return arr;
};

/**
 * Show Content & Hide Preview.
 * @param {Preview} item - preview element
 */
const showContent = item => {
	const itemIndex = previewItems.indexOf(item)
	const adjacentItems = getAdjacentItems(item)
	item.adjacentItems = adjacentItems

	const tl = gsap.timeline({
		defaults: ANIMATION_CONFIG,
		onStart: () => {
			lenis.stop()
			document.body.classList.add("content-open")
			item.content.DOM.elm.classList.add('content-current')

			gsap.set([item.content.DOM.titleInner, item.content.DOM.metaInner], {
				yPercent: -105,
				opacity: 0
			})

			gsap.set(item.content.DOM.thumbs, {
				transformOrigin: '0% 0%',
				scale: 0,
				yPercent: 150
			})
		},
		onComplete: () => isAnimation = false
	})
	.addLabel('start', 0)
	
	// hide adjacent preview elements
	for(const elm of item.adjacentItems) {
		tl.to(elm.item.DOM.elm, {
			y: elm.position < itemIndex ? -window.innerHeight : window.innerHeight
		}, 'start')
	}

	// gsap Flip logic: move the image element inside the content area
	tl.add(() => {
		const flipState = Flip.getState(item.DOM.image)
		item.content.DOM.elm.appendChild(item.DOM.image)

		Flip.from(flipState, {
			duration: ANIMATION_CONFIG.duration,
			ease: ANIMATION_CONFIG.ease,
			absolute: true
		})
	}, 'start')
	.to(item.DOM.titleInner, {
		yPercent: 100,
		opacity: 0,
		stagger: -0.03
	}, 'start')
	.to(item.DOM.description, {
		yPercent: 100,
		opacity: 0
	}, 'start')
	.addLabel('content', 0.15)
	.to(backButton, {
		opacity: 1
	}, 'content')
	.to(item.content.DOM.titleInner, {
		yPercent: 0,
		opacity: 1,
		stagger: -0.05
	}, 'content')
	.to(item.content.DOM.metaInner, {
		yPercent: 0,
		opacity: 1
	}, 'content')
	.to(item.content.DOM.thumbs, {
		yPercent: 0,
		scale: 1,
		stagger: -0.05
	}, 'content')
	.add(() => {
		item.content.multiLine.in()
	}, 'start')
}

const hideContent = () => {
	item = previewItems[currentPos]

	const tl = gsap.timeline({
		defaults: ANIMATION_CONFIG,
		onComplete: () => {
			lenis.start()
			document.body.classList.remove("content-open")
			item.content.DOM.elm.classList.remove('content-current')

			isAnimation = false
		},
	})
	// hide content elements
	.addLabel('start', 0)
	.to(backButton, {
		opacity: 0
	}, 'start')
	.to(item.content.DOM.titleInner, {
		yPercent: 101,
		opacity: 0,
		stagger: -0.05
	}, 'start')
	.to(item.content.DOM.metaInner, {
		yPercent: 101,
		opacity: 0
	}, 'start')
	.to(item.content.DOM.thumbs, {
		yPercent: 150,
		scale: 0,
		stagger: -0.05
	}, 'start')
	.add(() => {
		item.content.multiLine.out()
	}, 'start')
	.addLabel('preview', 0.3)
	.to(item.adjacentItems.map(elm => elm.item.DOM.elm), {
		y: 0
	}, 'preview')

	// gsap Flip logic: move the image element inside the content area
	tl.add(() => {
		const flipState = Flip.getState(item.DOM.image)
		item.DOM.imageWrap.appendChild(item.DOM.image)
		Flip.from(flipState, {
			duration: ANIMATION_CONFIG.duration,
			ease: ANIMATION_CONFIG.ease,
			absolute: true
		})
	}, 'preview')
	.to(item.DOM.titleInner, {
		yPercent: 0,
		opacity: 1,
		stagger: -0.03
	}, 'start')
	.to(item.DOM.description, {
		yPercent: 0,
		opacity: 1
	}, 'start')

}
const initEvents = () => {
	for(const [pos, item] of previewItems.entries()) {
		item.DOM.imageWrap.addEventListener('click', () => {
			if ( isAnimation ) return
			isAnimation = true
			currentPos = pos
			showContent(item)
		})
	}

	backButton.addEventListener('click', () => {
		if ( isAnimation ) return
		isAnimation = true
		hideContent()
	})
} 

initSmoothScrolling()
animateOnScroll()
initEvents()