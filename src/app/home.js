/**
 * Created by gooba on 20/09/2016.
 */

import store, {action} from '../common/rootStore'
import Comic from '../comics/comic'

export default class HomePage {

    constructor() {
        this.comics = null;

        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        store.subscribe(this.update);
        this.loadInitialComicWall();
    }

    update() {
        var response = store.getState().comics;
        if (this.latestComics == null) {
            this.latestComics = response.data.results;
            this.raw = response;
            this.loadInitialComicWall();
        }
    }

    loadInitialComicWall() {
        this.latestComics &&
        this.latestComics.map( (comic, index) => {
            var image = new Comic(index);
            image.update();
        });
        this.render();
    }

    render() {
    }


}