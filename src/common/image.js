/**
 * Created by gooba on 20/09/2016.
 */
export default class Image {
    constructor(src) {
        this.img = document.createElement('img')
        this.img.src = src;
    }

    addToDOM() {
        document.body.appendChild(this.img);
    }

    kill() {
        this.img.style.visibility = "hidden";
    }

    revive() {
        this.img.style.visibility = "visible";
    }

    imgElement() {
        return this.img;
    }
}