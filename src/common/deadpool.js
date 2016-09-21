/**
 * Created by gooba on 20/09/2016.
 */


/**
 * This is the DeadPool. Asuper basic/naive cache.
 * All images that are no
 * longer required end up here. When new images are
 * required, the DeadPool is checked first before
 * creating one from scratch
 */
export default class Deadpool {
    constructor() {
        this.elements = [];
    }

    add(image) {
        image.kill();
        this.elements.push(image);
    }

    get(src) {
        var image = this.elements.pop();
        if (image!=null) {
            image.src = src;
            image.revive();
        }
        return image;
    }

    getCount() {
        return this.elements.length;
    }
}