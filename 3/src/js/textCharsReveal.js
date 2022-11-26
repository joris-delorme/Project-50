import SplitType from "split-type";
import { warpElements } from "./utils";
import { gsap } from "gsap";

/**
 * Class representing a text line element that reveals itself by animating its translateY value
 */

export class TextCharsReveal {
    DOM = {
        el: null
    }

    SplitTypeInstance
    isVisible
    inTimeline
    outTimeline

    constructor(DOM_el) {
        this.DOM.el = DOM_el
        this.SplitTypeInstance = new SplitType(this.DOM.el, {types: 'chars, word'})
        warpElements(this.SplitTypeInstance.chars, 'div', 'chars-container')

        this.initEvents()
    }

    /**
     * Animates the lines in.
     * @return {GSAP Timeline} the animation timeline
     * @param {Boolean} animation - with or without animation.
     */

    in(animation = true, duration = 1) {
        this.isVisible = true

        gsap.killTweensOf(this.SplitTypeInstance.chars)
        this.inTimeline = gsap.timeline({defaults: {
            duration: duration,
            ease: 'power2.out',
        }})
        .addLabel('start', 0)
        .set(this.SplitTypeInstance.chars, {
            yPercent: 150,
            opacity: 1
        }, 'start')

        if (animation) {
            this.inTimeline.to(this.SplitTypeInstance.chars, {
                yPercent: 0,
                stagger: 0.05
            }, 'start')
        } else {
            this.inTimeline.set(this.SplitTypeInstance.chars, {
                yPercent: 0,
            }, 'start')
        }

        return this.inTimeline
    }

    /**
     * Animates the lines out.
     * @param {Boolean} animation - with or without animation.
     * @param {Number} direction - with or without animation.
     * @return {GSAP Timeline} the animation timeline
     */
    out(animation = true, direction = -1) {
        this.isVisible = false

        gsap.killTweensOf(this.SplitTypeInstance.chars)
        this.outTimeline = gsap.timeline({defaults: {
            duration: 1.5,
            ease: 'power4.inOut',
        }})
        .addLabel('start', 0)

        if (animation) {
            this.outTimeline.to(this.SplitTypeInstance.chars, {
                yPercent: 150 * direction,
                stagger: 0.05
            }, 'start')
        } else {
            this.outTimeline.set(this.SplitTypeInstance.chars, {
                yPercent: 150 * direction,
            }, 'start')
        }

        return this.outTimeline
    }

    /**
     * Initializes some events.
     */

    initEvents() {
        window.addEventListener('resize', () => {
            this.SplitTypeInstance = new SplitType(this.DOM.el, {types: 'chars'})
            warpElements(this.SplitTypeInstance.chars, 'div', 'chars-container')
        })
    }

}