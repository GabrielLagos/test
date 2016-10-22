/**
 * Created by gooba on 22/09/2016.
 */

import store, {action} from '../common/rootStore'
import ImageFactory from '../common/imageFactory'
import {getWallOfComics} from '../comicWall/wallActions'
import {sleep} from '../services/utilities';

/**
 * This class is responsible for putting up the background images onto the page.
 * The comicWall will be in the background fixed, absolutely to the window. All the
 * images will be very dark and semi transparent.
 *
 * Initially the list of images are random, but after the user starts to navigate,
 * they will change accordingly - show all characters in the selected comic, show all
 * comics that the character has appeared in.
 */
export default class ComicWall {
    constructor() {
        this.storeUpdated = this.storeUpdated.bind(this);
        this.render = this.render.bind(this);

        this.lastUpdate = 0;
        console.log("Fetching comics now");
        store.dispatch(getWallOfComics())
            .then(() => console.log("All done fetching comics!"));

        store.subscribe(this.storeUpdated);
    }

    storeUpdated() {
        var wall = store.getState().comicWall;
        if (wall.timestamp != null && wall.timestamp != this.lastUpdate) {
            //ok lets update the comic wall!
            this.lastUpdate = wall.timestamp;
            this.comics = wall.comics.data.results;
            this.render();
        }
    }

    static thumbnail(data) {
        var prefix = data && data.thumbnail;
        if (prefix == null) {
            //oops. didnt find a thumbnail. Odd.
            return;
        }
        var image = prefix.path;
        var ext = prefix.extension;
        var size = "portrait_incredible";
        return `${image}/${size}.${ext}`;
    }

    changeComicClassnames(className) {
        this.comics.map((comic, i) => {
            this.images[i].imgElement().className = className;
        });
    }

    render() {
        console.log("rendering wall of images")
        //check if a render has occurred before
        //and create a div otherwise
        if (this.div == null) {
            console.log("creating div");
            //the div should fill the window
            this.div = document.createElement("div");
            this.div.className = "comicWall";

            //once these images are in the dom they should flow according to css
            console.log(`going through all comic and creating images ${this.comics.length}`);
            this.images = [];
            this.comics.map((c) => {
                var image = ImageFactory.getImage(ComicWall.thumbnail(c));
                //store for future changes to src
                this.images.push(image);
                this.div.appendChild(image.imgElement());
            });
            document.body.appendChild(this.div);

        } else {
            //comic wall is already present. Simply change the image sources.

            //fadeout
            this.changeComicClassnames("fadeOut");
            //wait 1s (wait for the fadeout animation to complete)
            sleep(1000)
                //switch src urls
                .then(() => {
                    this.comics.map((comic, i) => {
                        this.images[i].imgElement().src = ComicWall.thumbnail(comic);
                    });
                })
                //sleep 500ms so images can load
                .then(() => sleep(500))
                //fade images back in
                .then(() => {
                    this.changeComicClassnames("fadeIn");
                })
                //wait for animation to complete
                .then(() => sleep(1000))
                //remove fadeIn class name
                .then(() => {
                    this.changeComicClassnames("");
                })

        }

    }
}