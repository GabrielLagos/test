/**
 * Created by gooba on 20/09/2016.
 */
import {createStore, applyMiddleware} from 'redux'
import comicApp from './rootReducers'
import thunk from 'redux-thunk';
import {watchWindowSize} from './windowActions'

const rootStore = createStore(
    comicApp,
    applyMiddleware(thunk));
export default rootStore;

//return a simple helper to fire off actions.
exports.action = action => rootStore.dispatch(action);

//we'll monitor window size in case the browser is resized.
//the images can resize accordingly when this happens
watchWindowSize();