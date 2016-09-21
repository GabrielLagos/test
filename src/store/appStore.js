/**
 * Created by gooba on 20/09/2016.
 */
import Redux, { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import { helloSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);



