/**
 * Created by gooba on 23/09/2016.
 */
import services from '../services/index'
import {SET_CHARACTERS, FETCH_CHARACTERS, SELECT_COMIC, REQUEST_CHARACTERS, RECEIVE_CHARACTERS} from '../characters/characterReducers'
import ComicActiona from "../comics/comicActions";

function requestCharacters() {
    return {
        type: REQUEST_CHARACTERS
    }
}

function receiveCharacters(json) {
    return {
        type: RECEIVE_CHARACTERS,
        payload: json,
    }
}

exports.fetchCharacters = (id) => {
    return dispatch => {
        dispatch(ComicActiona.asyncInProgress(true));
        return services.characters(id)
            .then(ComicActiona.asyncInProgress(false))
            .then(json => dispatch(receiveCharacters(json)))
    }
};
