/**
 * Created by gooba on 20/09/2016.
 */
import {combineReducers} from 'redux';
import {comics, selectedComic} from '../comics/comicReducers'
import {currentState} from '../common/currentStateReducers'
import {windowSize} from '../common/windowReducers'

const comicApp = combineReducers({
    currentState,
    comics,
    selectedComic,
    windowSize
});

export default comicApp;