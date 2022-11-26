import { TextCharsReveal } from "./textCharsReveal"

/**
 * Hero class to ref all elments
 */
export class Hero {
    DOM = {
        elm: null, // (#hero)
        titleInner: null,
        titleFirstName: null, // (.hero__title > .hero__title-firstName)
        titleLastName: null, // (.hero__title > .hero__title-lastName)
        navbarInner: null, // (.hero__navbar > .line-container > span)
        menu: null // (.menu)
    }

    /**
     * 
     * @param {Element} DOM_Elm - the #hero element
     */
    constructor (DOM_Elm) {
        this.DOM.elm = DOM_Elm
        this.DOM.titleInner = [...this.DOM.elm.querySelectorAll('.hero__title > div')]
        this.DOM.titleFirstName = new TextCharsReveal(this.DOM.elm.querySelector('.hero__title .hero__title-firstName'))
        this.DOM.titleLastName = new TextCharsReveal(this.DOM.elm.querySelector('.hero__title .hero__title-lastName'))
        this.DOM.navbarInner = [...this.DOM.elm.querySelectorAll('.hero__navbar  .line-container > span')]
        this.DOM.menu = this.DOM.elm.querySelector('.menu')
    }
}