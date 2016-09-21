/**
 * Created by gooba on 21/09/2016.
 */
import services from '../services/index'
import {SET_COMICS, FETCH_COMICS, SELECT_COMIC, REQUEST_COMICS, RECEIVE_COMICS} from '../comics/comicReducers'

function requestComics() {
    return {
        type: REQUEST_COMICS
    }
}

function receiveComics(json) {
    return {
        type: RECEIVE_COMICS,
        payload: json, //.data.children.map(child => child.data),
        //receivedAt: Date.now()
    }
}

exports.fetchComics = (id) => {
    return dispatch => {
        dispatch(requestComics());
        return services.comics()
            .then(json => dispatch(receiveComics(json)))
    }
};

exports.selectComic = (comic) => {
    console.log("select comic action")
    return {
        type : SELECT_COMIC,
        payload: comic
    }
};