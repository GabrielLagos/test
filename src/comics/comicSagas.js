/**
 * Created by gooba on 20/09/2016.
 */
import "babel-polyfill";
import {takeEvery} from 'redux-saga'
import {put} from 'redux-saga/effects'
import services from '../services/index'
import {SET_COMICS, FETCH_COMICS} from '../comics/comicReducers'

// Our worker Saga: will perform the async increment task
export function* fetchComics(action) {
    services.comics()
        .then(function(comics) {
            yield put(
                {
                    type: SET_COMICS,
                    payload: comics
                });
        });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchFetchComics() {
    yield* takeEvery('FETCH_COMICS', fetchComics)
}