/**
 * Created by gooba on 20/09/2016.
 */
import Factory from '../common/imageFactory'
import store,{action} from '../common/rootStore'
import {selectComic} from './comicActions'
import {setCurrentState} from '../common/currentStateActions'
import {STATE_SHOWING_COMIC_AND_CHARACTERS} from '../common/currentStateReducers'

let comicSizes = [
    'standard_small',
    'standard_medium',
    'standard_large',
    'standard_xlarge',
    'standard_fantastic',
    'standard_amazing'
];
export default class Comic {
    constructor(index) {
        this.index = index;
        this.thumbnailScale = 4;
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);
        store.subscribe(this.update);
    }

    thumbnail() {
        var image =  this.comicData.thumbnail.path;
        var ext = this.comicData.thumbnail.extension;
        var size = comicSizes[this.thumbnailScale];
        return `${image}/${size}.${ext}`;
    }

    adjustForWindowSize(appState) {
        var size = appState.windowSize;
        if (this.image==null || size==null) {
            return;
        }
        if (this.windowSize==null || this.windowSize.width!=size.width) {
            if (size.width < 300) {
                this.thumbnailScale = 0;
            } else if (size.width < 500) {
                this.thumbnailScale = 1;
            } else if (size.width < 600) {
                this.thumbnailScale = 2;
            } else if (size.width < 700) {
                this.thumbnailScale = 3;
            } else if (size.width < 800) {
                this.thumbnailScale = 4;
            } else {
                this.thumbnailScale = 5;
            }
            this.image.imgElement().src = this.thumbnail();
            this.windowSize = size;
            console.log(`scale = ${this.thumbnailScale} width: ${this.windowSize.width}`);
        }
    }

    update() {
        // console.log(`got an update for ${this.index}`);
        var appState = store.getState();

        this.adjustForWindowSize(appState);
        this.comicData = appState.comics.data.results[this.index];
        if (this.image==null) {
            this.createImage();
        }
        if (appState.currentState == STATE_SHOWING_COMIC_AND_CHARACTERS) {
            if (appState.selectedComic.id != this.comicData.id) {
                this.image.kill();
                this.image.imgElement().className = 'imgHidden';
            } else {
                this.image.imgElement().className = 'imgSelected';
                this.image.imgElement().style.top = 500 + 'px';
                this.image.imgElement().style.left = 300 + 'px';
            }
        }
        this.render();
    }

    onClick(event) {
        console.log(`Image ${this.index} was clicked!`);
        //this will update the store so that the selected comic becomes the selected ones.
        action(selectComic(this.comicData));
        //this will change the state to only show the selected comic. All the others will disappear
        action(setCurrentState(STATE_SHOWING_COMIC_AND_CHARACTERS));
    }

    createImage() {
        this.image = Factory.getImage(this.thumbnail());
        this.image.imgElement().className = 'imgWall';
        this.image.addToDOM();
        this.image.imgElement().addEventListener("click", this.onClick);
    }

    render() {
    }
}