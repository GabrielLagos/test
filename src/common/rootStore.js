/**
 * Created by gooba on 20/09/2016.
 */
import {createStore, applyMiddleware} from 'redux'
import comicApp from './rootReducers'
import thunk from 'redux-thunk';
import {fetchComics} from '../comics/comicActions'
import {watchWindowSize} from './windowActions'

const rootStore = createStore(
    comicApp,
    applyMiddleware(thunk));
export default rootStore;

//return a simple helper to fire off actions.
exports.action = action => rootStore.dispatch(action);

//initially we need some comics. Get some now asynchronously.
console.log("Fetching comics now");
rootStore.dispatch(fetchComics())
    .then(() => console.log("All done fetching comics!"));

//we'll monitor window size in case the browser is resized
watchWindowSize();