/**
 * Created by gooba on 20/09/2016.
 */
import Factory from '../common/imageFactory'
import store, {action} from '../common/rootStore'
import ComicActions,{selectComic} from './comicActions'
import {setCurrentState} from '../common/currentStateActions'
import {STATE_SHOWING_COMIC_AND_CHARACTERS} from '../common/currentStateReducers'
import {clearHomeScreen} from '../services/utilities'
import moment from "moment";
import {thumbnail, standard_fantastic} from "../services/utilities";

export default class Comic {
    constructor(index) {
        this.index = index;
        this.thumbnailScale = 4;
        this.bodyDiv = document.getElementsByClassName("bodyDiv")[0];
        this.stateUpdated = this.stateUpdated.bind(this);
        this.renderShowSelected = this.renderShowSelected.bind(this);
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);
        store.subscribe(this.stateUpdated);
    }

    adjustForWindowSize(appState) {
        var size = appState.windowSize;
        if (this.image == null || size == null) {
            return;
        }
        if (this.windowSize == null || this.windowSize.width != size.width) {
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

    getCreators(comic) {
        var defaultValue = {
            writer: [],
            penciller: [],
            "penciller (cover)": []
        };
        var creator = comic && comic.creators;
        if (creator == null) {
            return defaultValue;
        }

        try {
            return comic.creators.items.reduce((e, creator) => {
                var role = creator.role && creator.role.substr(0,5);
                if ("pencillerwriter".indexOf(role) >= 0) {
                    e[creator.role].push(creator.name);
                }
                return e;
            }, defaultValue)

        }
        catch (e) {
            console.warn(`Error get creators for this comic: ${JSON.stringify(comic, null, 4)}`);
            console.error(e);
            return defaultValue;
        }
    }

    renderShowSelected() {
        // debugger;
        var comic = this.selectedComic.data.results[0];
        var date = comic.dates && comic.dates.length > 0 && comic.dates[0].date;

        var creators = this.getCreators(comic);
        var onSaleDate = moment(date).format('MMMM Do, YYYY');
        var template = `
            <div class="comicInformation">
                <div class="comicContent" role="content">
                    <img src="${thumbnail(comic, standard_fantastic)}"/>
                    <div class="descriptionBox">
                        <h1>${comic.title}</h1>
                        <div class="publicationDetails">
                            <div class="details">
                                <label>On Sale Date</label>
                                <p>${onSaleDate}</p>
                            </div>
                            <div class="details">
                                <label>Writer</label>
                                <p>${creators.writer.join(',')}</p>
                            </div>
                            <div class="details">
                                <label>Penciller</label>
                                <p>${creators.penciller.join(',')}</p>
                            </div>
                            <div class="details">
                                <label>Cover Artist</label>
                                <p>${creators["penciller (cover)"].join(',')}</p>
                            </div>
                        </div>
                        <p class="description">
                            ${comic.description}
                        </p>
                    </div>
                </div>
                <div class="charactersInComic">
                </div>
            </div>
        `;

        var div = document.createElement('div');
        div.innerHTML = template;

        for (var i=0; i<div.children.length; i++)
        {
            this.bodyDiv.appendChild(div.children[i]);
        }
    }

    renderCharactersInComic() {

        var grid = document.getElementsByClassName('charactersInComic')[0];
        if (grid==null || this.characters==null) {
            return;
        }

        var div = document.createElement('div');
        let template;

        if (this.characters.count == 0) {
            template = `<h4>No characters available</h4>`;
        } else {
            var characters = this.characters.results;
            var images = characters.map(character => {
                return `
                <img src="${thumbnail(character, 'standard_medium')}" class="characterThumbnail"/>
            `;
            });
            template = images.join('');
        }

        div.innerHTML = template;
        while (div.children.length>0)
        {
            grid.appendChild(div.children[0]);
        }
    }

    stateUpdated() {
        var selectedComic = store.getState().selectedComic;
        if (selectedComic.timestamp != null && selectedComic.timestamp != this.lastUpdate) {
            this.lastUpdate = selectedComic.timestamp;
            this.selectedComic = selectedComic.comic;
            console.log("a comic has been selected!");
            clearHomeScreen();
            this.renderShowSelected();

            var comic = this.selectedComic.data.results[0];
            //this.characters = comic.characters;
            //this.renderCharactersInComic();
            action(ComicActions.fetchCharactersInComic(comic.id));
        }

        var charactersInComic = store.getState().charactersInComic;
        if (charactersInComic.timestamp != null && charactersInComic.timestamp != this.charactersInComicLastUpdate) {
            this.charactersInComicLastUpdate = charactersInComic.timestamp;
            this.characters = charactersInComic.characters.data;

            this.renderCharactersInComic();
        }

        var comics = store.getState().comics;
        if (comics.timestamp != null && comics.timestamp != this.comicsLastUpdate) {
            this.comicsLastUpdate = selectedComic.timestamp;
        }

        /*
         // console.log(`got an stateUpdated for ${this.index}`);
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
         */
    }

    onClick(event) {
        console.log(`Image ${this.index} was clicked!`);
        //this will stateUpdated the store so that the selected comic becomes the selected ones.
        action(selectComic(this.comicData));
        //this will change the state to only show the selected comic. All the others will disappear
        action(setCurrentState(STATE_SHOWING_COMIC_AND_CHARACTERS));
    }

    createImage() {
        this.image = Factory.getImage(thumbnail());
        this.image.imgElement().className = 'imgWall';
        this.image.addToDOM();
        this.image.imgElement().addEventListener("click", this.onClick);
    }

    render() {
    }
}