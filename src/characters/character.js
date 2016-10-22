/**
 * Created by gooba on 23/09/2016.
 */
import store, {action} from '../common/rootStore'
import {clearHomeScreen} from '../services/utilities'
import ComicActions from "../comics/comicActions";
import {thumbnail, standard_fantastic} from "../services/utilities";
import ImageFactory from "../common/imageFactory";

export default class Character {
    constructor() {
        this.stateUpdated = this.stateUpdated.bind(this);
        this.renderCharacterDetails = this.renderCharacterDetails.bind(this);
        this.renderComics = this.renderComics.bind(this);
        this.selectComic = this.selectComic.bind(this);

        this.bodyDiv = document.getElementsByClassName("bodyDiv")[0];

        store.subscribe(this.stateUpdated);
    }

    stateUpdated() {
        //Character was selected/looked up.
        var selectedCharacter = store.getState().character;
        if (selectedCharacter.timestamp != null && selectedCharacter.timestamp != this.lastUpdate) {
            this.lastUpdate = selectedCharacter.timestamp;
            this.response = selectedCharacter.character.data;
            this.count = this.response.total;
            this.character = this.response.results[0];
            console.log("a character has been selected!");
            clearHomeScreen();
            this.renderCharacterDetails();

            //this.renderCharactersInComic();
            action(ComicActions.fetchComicsWithCharacters(this.character.id));
        }

        //comics with the above characters has come in.
        var comics = store.getState().comicsWithCurrentCharacter;
        if (comics.timestamp != null && comics.timestamp != this.comicUpdate) {
            this.comicUpdate = comics.timestamp;
            this.response = comics.comics.data;
            this.comicCount = this.response.total;
            this.comics = this.response.results;

            this.renderComics();
        }


    }

    renderCharacterDetails() {
        var div = document.createElement('div');

        var name = this.character.name;
        var description = this.character.description;

        div.innerHTML = `
            <div class="characterInformation">
                <div class="heroContainer" role="content">
                    <h1 class="characterHeading">${name}</h1>
                    <img class="characterImage" src="${thumbnail(this.character, 'detail')}"/>
                    <p class="characterDescription">${description}</p>
                </div>

                <div class="charactersInComic">
                </div>
            </div>
        `;
        for (var i = 0; i < div.children.length; i++) {
            this.bodyDiv.appendChild(div.children[i]);
        }
    }


    selectComic(id) {
        console.log(`comic pressed ${id}`);
        action(ComicActions.fetchSelectedSuggestion(id));
    }

    renderComics() {
        let template;
        var div = document.createElement('div');
        var grid = document.getElementsByClassName('charactersInComic')[0];
        if (this.comicCount == 0) {
            template = `<h4>No comics with ${this.character.name}</h4>`;

            div.innerHTML = template;
            while (div.children.length>0)
            {
                grid.appendChild(div.children[0]);
            }
        } else {
            while(grid.children.length>0) {
                grid.removeChild(grid.firstChild);
            }
            console.log(`\n\nBEFORE grid count = ${grid.children.length}`);
            console.log(`comics count = ${this.comics.length}`);
            var thumbs = this.comics.map(comic => {
                var img = ImageFactory.getImage(thumbnail(comic, 'standard_medium'));
                let id=comic.id;
                img.imgElement().onclick = () => this.selectComic(id); //onclick.call(this, id);
                img.imgElement().className = "characterThumbnail";
                return img.imgElement();
            });
            console.log(`thumb count = ${thumbs.length}`);

            thumbs.map((element) => {
                grid.appendChild(element);
            });
            console.log(`grid count = ${grid.children.length}`);

        }

    }
}