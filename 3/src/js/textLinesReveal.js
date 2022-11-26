import SplitType from "split-type";
import { warpElements } from "./utils";
import { gsap } from "gsap";

/**
 * Class representing a text line element that reveals itself by animating its translateY value
 */

export class TextLinesReveal {
    DOM = {
        el: null
    }

    SplitTypeInstance
    isVisible
    inTimeline
    outTimeline

    constructor(DOM_el) {
        this.DOM.el = DOM_el
        this.SplitTypeInstance = new SplitType(this.DOM.el, {types: 'lines'})
        warpElements(this.SplitTypeInstance.lines, 'div', 'line-container')

        this.initEvents()
    }

    /**
     * Animates the lines in.
     * @return {GSAP Timeline} the animation timeline
     * @param {Boolean} animation - with or without animation.
     */
    in(animation = true) {
        this.isVisible = true

        gsap.killTweensOf(this.SplitTypeInstance.lines)
        this.inTimeline = gsap.timeline({defaults: {
            duration: 1,
            ease: 'power2.inOut',
        }})
        .addLabel('start', 0)
        .set(this.SplitTypeInstance.lines, {
            yPercent: 105,
            opacity: 1
        }, 'start')

        if (animation) {
            this.inTimeline.to(this.SplitTypeInstance.lines, {
                yPercent: 0,
                stagger: 0.1
            }, 'start')
        } else {
            this.inTimeline.set(this.SplitTypeInstance.lines, {
                yPercent: 0,
            }, 'start')
        }

        return this.inTimeline
    }

    /**
     * Animates the lines out.
     * @param {Boolean} animation - with or without animation.
     * @return {GSAP Timeline} the animation timeline
     */
    out(animation = true) {
        this.isVisible = false

        gsap.killTweensOf(this.SplitTypeInstance.lines)
        this.outTimeline = gsap.timeline({defaults: {
            duration: 1.5,
            ease: 'power4.inOut',
        }})
        .addLabel('start', 0)

        if (animation) {
            this.outTimeline.to(this.SplitTypeInstance.lines, {
                yPercent: -105,
                stagger: 0.1
            }, 'start')
        } else {
            this.outTimeline.set(this.SplitTypeInstance.lines, {
                yPercent: -105,
            }, 'start')
        }

        return this.outTimeline
    }

    /**
     * Initializes some events.
     */

    initEvents() {
        window.addEventListener('resize', () => {
            this.SplitTypeInstance = new SplitType(this.DOM.el, {types: 'lines'})
            warpElements(this.SplitTypeInstance.lines, 'div', 'lines-container')
        })
    }

}