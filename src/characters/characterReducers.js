/**
 * Created by gooba on 23/09/2016.
 */
export const SET_CHARACTERS = "SET_CHARACTERS";
export const SELECT_CHARACTER = "SELECT_CHARACTER";
export const FETCH_CHARACTERS = "FETCH_CHARACTERS";
export const REQUEST_CHARACTERS = 'REQUEST_CHARACTERS';
export const RECEIVE_CHARACTER = 'RECEIVE_CHARACTER';
export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
export const RECEIVED_CHARACTERS_IN_COMIC = 'RECEIVED_CHARACTERS_IN_COMIC';

exports.comicsWithCurrentCharacter = (state={}, action) => {
    switch (action.type) {
        case RECEIVED_CHARACTERS_IN_COMIC:
            return {
                comics : action.payload,
                timestamp: Date.now()
            };

        default:
            return state;
    }
};

exports.characters = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_CHARACTERS:
            return {
                characters : action.payload,
                timestamp: Date.now()
            };

        default:
            return state;
    }
};

exports.selectedCharacter = (state = {}, action) => {
    switch (action.type) {
        case SELECT_CHARACTER:
            return {
                character: action.payload,
                timestamp: Date.now()
            };

        default:
            return state;
    }
};

exports.character = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CHARACTER:
            return {
                character: action.payload,
                timestamp: Date.now()
            };

        default:
            return state;
    }
};

