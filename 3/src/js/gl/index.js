import * as THREE from 'three'
import gsap from 'gsap'

export default new class Gl {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(45, document.body.getBoundingClientRect().width /  document.body.getBoundingClientRect().height, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(document.body.getBoundingClientRect().width, document.body.getBoundingClientRect().height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        this.renderer.setClearColor(0xffffff, 0)
        this.isReveal = false
        this.clock = new THREE.Clock()
        this.mouse = new THREE.Vector2()
        this.scrollY = 0
        this.scrollYTarget = 0
        this.mouseTarget = new THREE.Vector2()

        this.camera.position.set(0, 0, 18)

        this.init()
        this.animate()
    }

    init() {
        this.addCanvas()
        this.addEvents()
    }

    addCanvas() {
        const canvas = this.renderer.domElement
        canvas.classList.add('blobs')
        document.body.appendChild(canvas)
    }

    addEvents() {
        window.addEventListener('resize', this.resize.bind(this))
        window.addEventListener('mousemove', this.mouseMove.bind(this))
        window.addEventListener('scroll', this.onScroll.bind(this))
    }

    resize() {
        let width = document.body.getBoundingClientRect().width
        let height = document.body.getBoundingClientRect().height

        this.camera.aspect = width / height
        this.renderer.setSize(width, height)

        this.camera.updateProjectionMatrix()
    }

    mouseMove(e) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = (e.clientY / window.innerHeight) * 2 + 1;
    }

    onScroll() {
        this.scrollY = window.scrollY
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this))
        this.render()
    }

    render() {

        // Lerp Movement
        this.mouseTarget.x = gsap.utils.interpolate(this.mouseTarget.x, this.mouse.x, 0.2)
        const distortionAnimation =  gsap.utils.interpolate(this.mouseTarget.y, Math.min(Math.max(this.mouse.y, 1.5), 2.5), 0.05)
        this.mouseTarget.y =  gsap.utils.interpolate(this.mouseTarget.y, this.mouse.y, 0.05)
        this.scrollYTarget = gsap.utils.interpolate(this.scrollYTarget, this.scrollY, 0.05)

        // Update Uniforms
        this.scene.children.forEach(mesh => {
            mesh.material.uniforms.uTime.value = this.clock.getElapsedTime()
            mesh.material.uniforms.uDistortionAnimation.value = distortionAnimation
            if (mesh.isAnimateBlob) {
                mesh.material.uniforms.uOffset.value = (this.mouseTarget.y * 2) - (4 + (this.scrollYTarget * 0.01))
            }
            mesh.rotation.set(gsap.utils.interpolate(mesh.rotation.x, this.scrollYTarget * 0.005, 0.05), gsap.utils.interpolate(mesh.rotation.y, this.mouseTarget.x * 2, 0.05), 0)   
        })

        this.renderer.render(this.scene, this.camera)
    }
}