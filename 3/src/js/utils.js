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



export {
    warpElements
}