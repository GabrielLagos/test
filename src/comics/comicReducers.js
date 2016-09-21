/**
 * Created by gooba on 20/09/2016.
 */
export const SET_COMICS = "SET_COMICS";
export const SELECT_COMIC = "SELECT_COMIC";
export const FETCH_COMICS = "FETCH_COMICS";
export const REQUEST_COMICS = 'REQUEST_COMICS';
export const RECEIVE_COMICS = 'RECEIVE_COMICS'

exports.comics = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_COMICS:
            return action.payload;

        default:
            return state;
    }
};

exports.selectedComic = (state = null, action) => {
    switch (action.type) {
        case SELECT_COMIC:
            return action.payload;

        default:
            return state;
    }
};