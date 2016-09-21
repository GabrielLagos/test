/**
 * Created by gooba on 21/09/2016.
 */
import {SET_CURRENTSTATE} from './currentStateReducers'

exports.setCurrentState = function(newState) {
    return {
        type: SET_CURRENTSTATE,
        payload: newState
    }
};