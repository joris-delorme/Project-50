import { TextCharsReveal } from "./textCharsReveal"
import gsap from "gsap"
import { TextLinesReveal } from "./textLinesReveal"
import { RevealObserver } from "./RevealObserver"
import Blob from "./gl/Blob"
import Gl from "./gl"
import Lenis from '@studio-freight/lenis'

const titleInner = new TextCharsReveal(document.querySelector('h1'))
const subTitleInner = new TextCharsReveal(document.querySelector('.hero > p'))
const aboutParagraph = document.querySelector('#about > p')
const scrollLine = document.querySelector('.line-scroll')
const aboutTitle = document.querySelector('#about > h2')
const aboutTitleInner = new TextCharsReveal(document.querySelector('#about > h2'))
const aboutParagraphInner = new TextLinesReveal(document.querySelector('#about > p'))
const headerMenu = document.querySelectorAll('.navbar ul > li')
const logoMenu = document.querySelectorAll('.logo')

console.log(headerMenu);
let lenis
const blobs = []

const addBlobs = () => {

    const blob1 = new Blob(3, 0.15, 0.4, 2.0, 0.3, Math.PI * 2);
    const blob2 = new Blob(1.75, 0.3, 0.1, 2.5, 0.2, Math.PI * 1, false);
    const blob3 = new Blob(0.8, 0.5, 0.1, 2.0, 0.05, Math.PI * 0.5);

    blob1.position.set(0, 5, -7);
    blob2.position.set(3.3, -15.7, -35);
    blob3.position.set(-1, -4, 4);

    blob1.rotation.set(0, 0, 0);
    blob2.rotation.set(0, 0, 0);
    blob3.rotation.set(0, 0, 0);

    blobs.push(...[blob1, blob2])

    Gl.scene.add(...blobs)
}

const initSmoothScrolling = () => {

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


const revealAnimation = () => {
    addBlobs()
    const uniformAlphas = [
        blobs[0].mesh.material.uniforms.uAlpha
    ];

    initSmoothScrolling()

    gsap.timeline({
        defaults: {
            duration: 3,
            ease: "power2.inOut"
        },
        onStart: () => lenis.stop()
    })
        // init
        .set(scrollLine, {scaleY: 0})
        .set(headerMenu, {opacity: 0, y: -20})
        .set(logoMenu, {opacity: 0})
        .add(() => titleInner.out(false))
        .add(() => subTitleInner.out(false))
        .add(() => aboutTitleInner.out(false))
        .add(() => aboutParagraphInner.out(false))
        .addLabel('text', 1.25)
        .addLabel('text2', 1.65)
        .addLabel('start', 0)
        .addLabel('startScroll', 2)
        // Anime Blobs
        .from(blobs[0].position, { z: -50 }, 'start')
        .from(blobs[0].rotation, { x: 2 }, 'start')
        .from(uniformAlphas, {
            value: 0,
            stagger: 0.2,
            ease: 'power3.inOut'
        }, 'start')
        .add(() => {
            Gl.isReveal = true
        })
        .add(() => document.body.classList.remove('loading'), 'start')
        // Text
        .add(() => titleInner.in(), 'text')
        .add(() => subTitleInner.in(), '-=1.4')
        .to(headerMenu, {duration: 1, opacity: 1, y: 0, stagger: 0.2}, 'text')
        .to(logoMenu, {duration: 1, opacity: 1}, 'text')
        .to(scrollLine, {
            scaleY: 1
        }, 'start')
        .add(() => {
            lenis.start()
            const aboutParagraphObserver = new RevealObserver(aboutParagraphInner, aboutParagraph)
            const aboutTitleObserver = new RevealObserver(aboutTitleInner, aboutTitle)
            aboutTitleObserver.creatObserver()
            aboutParagraphObserver.creatObserver()
        }, 'startScroll')
}


window.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling()
    revealAnimation()
})