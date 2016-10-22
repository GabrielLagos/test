/**
 * Created by gooba on 20/09/2016.
 */
export const SUGGESTION_SELECTED = "SUGGESTION_SELECTED";
export const SET_COMICS = "SET_COMICS";
export const RECEIVE_SELECTED_SUGGESTION = "RECEIVE_SELECTED_SUGGESTION";
export const SELECT_COMIC = "SELECT_COMIC";
export const ASYNC_IN_PROGRESS = "ASYNC_IN_PROGRESS";
export const FETCH_COMICS = "FETCH_COMICS";
export const REQUEST_COMICS = 'REQUEST_COMICS';
export const RECEIVE_COMICS = 'RECEIVE_COMICS';
export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
export const RECEIVED_WALL_OFF_COMICS = 'RECEIVED_WALL_OFF_COMICS';
import {RECEIVED_CHARACTERS_IN_COMIC} from "../characters/characterReducers";

exports.asyncInProgress = (state = false, action) => {
    switch (action.type) {
        case ASYNC_IN_PROGRESS:
            return {
                timestamp: Date.now(),
                asyncInProgress: action.payload
            };

        default:
            return state;
    }
};

exports.charactersInComic = (state = [], action) => {
    switch (action.type) {
        case RECEIVED_CHARACTERS_IN_COMIC:
            return {
                timestamp: Date.now(),
                characters: action.payload
            };

        default:
            return state;
    }
};

exports.comics = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_COMICS:
            return {
                comics : action.payload,
                timestamp: Date.now()
            };

        default:
            return state;
    }
};

exports.comicWall = (state = {}, action) => {
    switch (action.type) {
        case RECEIVED_WALL_OFF_COMICS:
            return {
                comics: action.payload,
                timestamp: Date.now()
            };

        default:
            return state;
    }
};

exports.selectedComic = (state = {}, action) => {
    switch (action.type) {
        case SELECT_COMIC:
            return {
                comic: action.payload,
                timestamp: Date.now()
            };

        default:
            return state;
    }
};