import { Content } from "./content";
/**
 * Class representing a Preview element (.preview)
 */
export class Preview {
    // DOM elements
	DOM = {
		// main element (.preview)
		elm: null,
		// image wrap element (.preview__img-wrap)
		imageWrap: null,
        // image element (.preview__img)
		image: null,
		// image inner element (.preview__img-inner)
		s: null,
        // title element (.preview__title)
		title: null,
        // inner title elements (.oh__inner)
        titleInner: null,
        // description element (.preview__desc)
        description: null,
	};
	
	/**
	 * Constructor.
	 * @param {Element} DOM_el - main element (.preview)
	 */
	constructor(DOM_el, content_el) {
		this.DOM.elm = DOM_el;
        this.content = new Content(content_el)
        this.DOM.imageWrap = this.DOM.elm.querySelector('.preview__img-wrap');
		this.DOM.image = this.DOM.elm.querySelector('.preview__img');
		this.DOM.imageInner = this.DOM.elm.querySelector('.preview__img-inner');
		this.DOM.title = this.DOM.elm.querySelector('.preview__title');
        this.DOM.titleInner = [...this.DOM.elm.querySelectorAll('.preview__title-main > .line-container > span')];
        this.DOM.description = this.DOM.elm.querySelector('.preview__desc');
	}
}