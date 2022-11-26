import { TextLinesReveal } from "./textLinesReveal";

/**
 * Class representing a Content element (.content)
 */
 export class Content {
    // DOM elements
	DOM = {
		// main element (.content)
		elm: null,
        // title element (.content__text-title)
		title: null,
        // inner title elements (.content__text-title .line-container)
        titleInner: null,
        // inner meta element (.content__text-meta .line-container)
        metaInner: null,
        // text element (.content__text)
        text: null,
		// thumbs (.content__thumbs-item)
		thumbs: null,
	};
	
	/**
	 * Constructor.
	 * @param {Element} DOM_el - main element (.content)
	 */
	constructor(DOM_el) {
		this.DOM.elm = DOM_el;
        this.DOM.title = this.DOM.elm.querySelector('.content__text-title');
        this.DOM.titleInner = [...this.DOM.title.querySelectorAll('.line-container > span')];
        this.DOM.text = this.DOM.elm.querySelector('.content__text');
        this.DOM.metaInner = this.DOM.elm.querySelector('.content__text-meta > .line-container > span');
        this.multiLine = new TextLinesReveal(this.DOM.elm.querySelector('.content__text-desc'))
        this.DOM.thumbs = [...this.DOM.elm.querySelectorAll('.content__thumbs-item')];
	}
}