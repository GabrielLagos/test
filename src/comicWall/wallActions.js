/**
 * Created by gooba on 23/09/2016.
 */
import services from '../services/index'
import {RECEIVED_WALL_OFF_COMICS} from '../comics/comicReducers'
import ComicActions from '../comics/comicActions'


function receivedWallOfComics(json) {
    return {
        type: RECEIVED_WALL_OFF_COMICS,
        payload: json,
    }
}

exports.getWallOfComics = () => {
    return dispatch => {
        dispatch(ComicActions.requestComics());
        return services.comics(-1)
            .then(json => dispatch(receivedWallOfComics(json)))
    }
};

