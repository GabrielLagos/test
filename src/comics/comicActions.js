/**
 * Created by gooba on 21/09/2016.
 */
import services from '../services/index'
import {
    RECEIVE_SELECTED_SUGGESTION,
    ASYNC_IN_PROGRESS,
    SUGGESTION_SELECTED,
    SELECT_COMIC,
    RECEIVE_CHARACTERS,
    REQUEST_COMICS,
    RECEIVE_COMICS
} from '../comics/comicReducers';

import {RECEIVE_CHARACTER, RECEIVED_CHARACTERS_IN_COMIC} from "../characters/characterReducers";

export default class ComicActions {
    static requestComics() {
        return {
            type: REQUEST_COMICS
        };
    }

    static receiveComics(json) {
        return {
            type: RECEIVE_COMICS,
            payload: json
        };
    }

    static receiveCharacters(json) {
        return {
            type: RECEIVE_CHARACTERS,
            payload: json
        };
    }

    static receiveComicsWithCharacter(json) {
        return {
            type: RECEIVED_CHARACTERS_IN_COMIC,
            payload: json
        };
    }

    static receiveSelectedSuggestion(json) {
        return {
            type: RECEIVE_SELECTED_SUGGESTION,
            payload: json,
        }
    }

    static fetchComics(id) {
        return dispatch => {
            dispatch(ComicActions.requestComics());
            return services.comics(id)
                .then(json => dispatch(ComicActions.receiveComics(json)))
        }
    }

    static fetchCharacters(id) {
        return dispatch => {
            dispatch(ComicActions.asyncInProgress(true));
            return services.characters(id)
                .then(json => dispatch(ComicActions.receiveCharacter(json)))
                .then(() => dispatch(ComicActions.asyncInProgress(false)))
        }
    }

    static fetchCharactersInComic(id) {
        return dispatch => {
            dispatch(ComicActions.asyncInProgress(true));
            return services.charactersInComic(id)
                .then(json => dispatch(ComicActions.receiveCharactersInComic(json)))
                .then(() => dispatch(ComicActions.asyncInProgress(false)))

        }
    }

    static fetchSelectedSuggestion(id) {
        return dispatch => {
            dispatch(ComicActions.requestComics());
            return services.comics(id)
                .then(json => dispatch(ComicActions.selectComic(json)))
        }
    }

    static selectComic(comic) {
        console.log("select comic action")
        return {
            type: SELECT_COMIC,
            payload: comic
        }
    }

    static asyncInProgress(isInProgress) {
        return {
            type: ASYNC_IN_PROGRESS,
            payload: isInProgress
        };
    }

    static receiveCharactersInComic(json) {
        return {
            type: RECEIVED_CHARACTERS_IN_COMIC,
            payload: json,
        }
    }

    static fetchComicsWithCharacters(id) {
        return dispatch => {
            dispatch(ComicActions.asyncInProgress(true));
            return services.comicsWithCharacters(id)
                .then(json => dispatch(ComicActions.receiveComicsWithCharacter(json)))
                .then(() => dispatch(ComicActions.asyncInProgress(false)));
        }
    }

    static receiveCharacter(json) {
        return {
            type: RECEIVE_CHARACTER,
            payload: json,
        }
    }
}