import { TextCharsReveal } from "./textCharsReveal"

/**
 * Page class to ref all elments
 */
export class Page {
    DOM = {
        elm: null, // (#hero)
        herderInner: null, // (header > .line-container > span)
        listInner: null, // (ul > li)
        listInnerChars: [], // (ul > li > TextCharsReveal)
        back: null // (.back-btn)
    }

    /**
     * 
     * @param {Element} DOM_Elm - the #hero element
     */
    constructor (DOM_Elm) {
        this.DOM.elm = DOM_Elm
        this.DOM.herderInner = this.DOM.elm.querySelector('h2  .line-container  span')
        this.DOM.listInner = [...this.DOM.elm.querySelectorAll('ul > li')]
        for(const word of this.DOM.listInner) {
            this.DOM.listInnerChars.push(new TextCharsReveal(word))
        }
        this.DOM.back = this.DOM.elm.querySelector('.back-btn')
    }
}