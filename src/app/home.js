/**
 * Created by gooba on 20/09/2016.
 */

import store, {action} from '../common/rootStore'
import services from '../services/index'
import ImageWall from '../comicWall/comicWall'
import ComicActions from '../comics/comicActions'
import Comic from "../comics/comic";

import {clearHomeScreen} from '../services/utilities'
import Character from "../characters/character";

export default class HomePage {

    constructor() {
        this.comics = null;

        //this will insert a wall of images in the background and
        //automatically change them based on how the user interacts
        //with the app.
        new ImageWall();

        //this will monitor the application state and show comics/information as required.
        new Comic();

        //this will monitor the app state and show characters/information as required
        new Character();

        this.storeUpdated = this.storeUpdated.bind(this);
        this.render = this.render.bind(this);
        store.subscribe(this.storeUpdated);

        this.bodyDiv = document.getElementsByClassName("bodyDiv")[0];

        this.render();
    }

    storeUpdated() {
        var selectedComic = store.getState().selectedComic;
        if (selectedComic.timestamp != null && selectedComic.timestamp != this.lastUpdate) {
            this.clearSuggestionsList();
            //clearHomeScreen();
            this.lastUpdate = selectedComic.timestamp;
        }
    }

    template() {
        return `
            <div class="searchDiv">
                <input class="searchBox" autofocus="autofocus" type="text">
                <ul class="suggestions">
                </ul>
            </div>`;

    }

    onClickSuggestion(characterId) {
        console.log(`comic selected ${characterId}`);
        action(ComicActions.fetchCharacters(characterId));
    }

    clearSuggestionsList() {
        while( this.ul.firstChild ){
            this.ul.removeChild( this.ul.firstChild );
        }
    }
    onChange(e) {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        var partial = e.target.value;
        if (partial.length == 0) {
            this.suggestions = [];
            this.clearSuggestionsList();
            return;
        }
        this.timer = setTimeout(() => {
            this.timer = null;
            console.log(`searchBox changed ${partial}`);

            this.clearSuggestionsList();
            services.charactersStartingWith(partial)
                .then(response => {
                    var comics = response.data.results;
                    comics.sort((a,b) => {
                        return b.stories.available - a.stories.available;
                    });

                    this.suggestions = comics.map(comic => {
                        console.log(`name ${comic.name}`);
                        var li = document.createElement("li");
                        li.innerText = `${comic.name} [${comic.stories.available}]`;
                        li.onclick = () => {
                            this.onClickSuggestion(comic.id);
                        };
                        this.ul.appendChild(li);

                        return {
                            id: comic.id,
                            title: comic.title,
                        };
                    });
                    console.log(this.suggestions.length);
                });

        }, 300);
    }

    render() {
        var temp = document.createElement("div");
        temp.innerHTML = this.template();
        this.bodyDiv.innerHTML = this.template();

        this.ul = document.getElementsByClassName("suggestions")[0];
        document.getElementsByClassName("searchBox")[0].onkeyup = this.onChange.bind(this);
    }


}