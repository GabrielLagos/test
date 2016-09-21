/**
 * Created by gooba on 21/09/2016.
 */
export const SET_CURRENTSTATE = "SET_CURRENTSTATE";

export const STATE_SHOWING_INITIAL_COMICS = 0;
export const STATE_SHOWING_COMIC_AND_CHARACTERS = 1;
export const STATE_SHOWING_CHARACTERS_AND_COMICS = 2;

exports.currentState = (state = STATE_SHOWING_INITIAL_COMICS, action) => {
    switch (action.type) {
        case SET_CURRENTSTATE:
            return action.payload;

        default:
            return state;
    }
};

