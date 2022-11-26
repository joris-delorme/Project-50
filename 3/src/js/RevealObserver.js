export class RevealObserver {

    reveal = null;
    target = null;
    isReveal = false

    constructor(reveal, target) {
        this.reveal = reveal
        this.target = target

        console.log(reveal);
        console.log(target);
    }

    creatObserver = () => {

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0.5 && !this.isReveal) {
                    this.reveal.in()
                    this.isReveal = true
                }
            });
        }

        let observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: '0px',
            threshold: 1
        });

        observer.observe(this.target)
    }

}