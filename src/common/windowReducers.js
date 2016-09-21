/**
 * Created by gooba on 21/09/2016.
 */

export const CHANGE_WINDOW_SIZE = "CHANGE_WINDOW_SIZE";

let defaultWindowSize = {
    width: 0,
    height: 0
};

exports.windowSize = (state = defaultWindowSize, action) => {
    switch (action.type) {
        case CHANGE_WINDOW_SIZE:
            return action.payload;

        default:
            return state;
    }
};
