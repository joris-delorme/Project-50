/** 
* Warp elements of an array
* @param {Array} arr - the array of elements to by warpped
* @param {String} warpType - the type of the warp element ( 'div', 'a', 'p' )
* @param {String} warpClass - the class of the warp element
*/

const warpElements = (arr, warpType, warpClass) => {
    arr.forEach(elm => {
        const warpEl = document.createElement(warpType)
        warpEl.classList = warpClass
        elm.parentNode.appendChild(warpEl)
        warpEl.appendChild(elm)
    })
}

/**
 * Checks if an element is in the viewport
 * @param {Element} elm - the element to be checked
 */
const isInViewport = elm => {
    var bounding  = elm.getBoundingClientRect()
    return (
        (bounding.bottom >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) || bounding.top >= 0 && bounding.top <= (window.innerHeight || document.documentElement.clientHeight)) &&
        (bounding.right >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) || bounding.left >= 0 && bounding.left <= (window.innerWidth || document.documentElement.clientWidth))
    ) 
}

export {
    warpElements,
    isInViewport
}