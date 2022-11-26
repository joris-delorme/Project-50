import { gsap } from "gsap";
import { Hero } from "./Hero";
import { Page } from "./Page";

const heroElm = new Hero(document.getElementById('hero'))
const pageElm = new Page(document.querySelector('.page'))
const overlayPath = document.querySelector('.overlay__path')
const menuElm = heroElm.DOM.menu
const backElm = pageElm.DOM.back

const DEFAULT_CONFIG = {duration: 1, ease: 'power4.inOut'}

var isAnimation = false

const heroReveal = () => {
 const tl = gsap.timeline({
    defaults: {
        duration: 1.5,
        ease: 'power4.inOut'
    },
    onComplete: () => heroElm.DOM.menu.style.transition = 'all 0.5s'
 })
 .set(heroElm.DOM.navbarInner, {
    yPercent: 150
 })
 .set(heroElm.DOM.menu, {
    opacity: 0
 })
 .add(() => {
    heroElm.DOM.titleLastName.out(false)
 })
 .addLabel('start', 0)
 .addLabel('title2', 0.2)

 tl
 .add(() => {
    heroElm.DOM.titleFirstName.in()
 }, 'start')
 .add(() => {
    heroElm.DOM.titleLastName.in()
 }, 'title2')
 .to(heroElm.DOM.navbarInner, {
    yPercent: 0,
    stagger: 0.2
 }, 'start')
 .to(heroElm.DOM.menu, {
    opacity: 1
 }, 'start')
}

const goMenu = () => {

    if (isAnimation) return
    isAnimation = true
    gsap.timeline({
        defaults: DEFAULT_CONFIG,
        onComplete: () => isAnimation = false
    })
    // Hide
    .set(overlayPath, {
        attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
    })
    .add(() => {
        for(const word of pageElm.DOM.listInnerChars) {
            word.out(false)
        }
    }, 0)
    .to(heroElm.DOM.titleInner, {
        y: -150,
        opacity: 0
    }, 0.2)
    .to(heroElm.DOM.navbarInner, {
        yPercent: -150,
        stagger: 0.1
    }, 0.2)
    .to(overlayPath, { 
        duration: 0.8,
        ease: 'power4.in',
        attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' }
    }, 0)
    .to(overlayPath, { 
        duration: 0.3,
        ease: 'power2',
        attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
        onComplete: () => {
            heroElm.DOM.elm.classList.add('hero--hidden');
            pageElm.DOM.elm.classList.add('active');
        }
    }, 0.8)
    // Show
    .set(pageElm.DOM.elm, {
        opacity: 1
    }, 1.1)
    .set(overlayPath, { 
        attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' }
    }, 1.1)
    .to(overlayPath, { 
        duration: 0.3,
        ease: 'power2.in',
        attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
    }, 1.1)
    .to(overlayPath, { 
        duration: 0.8,
        ease: 'power4',
        attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
    }, 1.4)
    .add(() => {
        for(const [pos, word] of pageElm.DOM.listInnerChars.entries()) {
            setTimeout(() => {
                word.in()
            }, 200 * pos)
        }
    }, 0.75)
    .to(pageElm.DOM.herderInner, {
        yPercent: 0
    }, 0)
}

const goHero = () => {
    if (isAnimation) return
    isAnimation = true
    gsap.timeline({
        defaults: DEFAULT_CONFIG,
        onComplete: () => isAnimation = false
    })
    // Hide
    .set(overlayPath, {
        attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
    })
    .to(overlayPath, { 
        duration: 0.8,
        ease: 'power4.in',
        attr: { d: 'M 0 0 V 50 Q 50 100 100 50 V 0 z' }
    }, 0)
    .to(overlayPath, { 
        duration: 0.3,
        ease: 'power2',
        attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' },
        onComplete: () => {
            //frame.classList.add('frame--menu-open');
            heroElm.DOM.elm.classList.remove('hero--hidden');
            pageElm.DOM.elm.classList.remove('active');
        }
    })
    .add(() => {
        for(const word of pageElm.DOM.listInnerChars) {
            word.out(true, 1)
        }
    }, 0)
    .to(pageElm.DOM.herderInner, {
        yPercent: 150
    }, 0)
    // Show
    .set(pageElm.DOM.elm, {
        opacity: 0
    })
    .set(overlayPath, { 
        attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' }
    })
    .to(overlayPath, { 
        duration: 0.3,
        ease: 'power2.in',
        attr: { d: 'M 0 100 V 50 Q 50 100 100 50 V 100 z' }
    })
    .to(overlayPath, { 
        duration: 0.8,
        ease: 'power4',
        attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
    })
    .to(heroElm.DOM.titleInner, {
        y: 0,
        opacity: 1
    }, 0.9)
    .to(heroElm.DOM.navbarInner, {
        yPercent: 0,
        stagger: 0.1
    }, 0.9)
}

window.addEventListener('DOMContentLoaded', heroReveal)
menuElm.addEventListener('click', goMenu)
backElm.addEventListener('click', goHero)