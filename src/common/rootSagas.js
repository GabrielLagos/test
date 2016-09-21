/**
 * Created by gooba on 20/09/2016.
 */

import {watchFetchComics} from '../comics/comicSagas';

export default function* rootSaga() {
    yield [
        watchFetchComics()
    ]
}