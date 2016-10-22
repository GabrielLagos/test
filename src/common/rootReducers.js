/**
 * Created by gooba on 20/09/2016.
 */
import {combineReducers} from 'redux';
import {characters, character, comicsWithCurrentCharacter, selectedCharacter} from '../characters/characterReducers'
import {comics, asyncInProgress, charactersInComic, comicWall, selectedComic} from '../comics/comicReducers'
import {currentState} from '../common/currentStateReducers'
import {windowSize} from '../common/windowReducers'

const comicApp = combineReducers({
    asyncInProgress,
    charactersInComic,
    currentState,
    comics,
    comicWall,
    selectedComic,
    comicsWithCurrentCharacter,
    character,
    characters,
    selectedCharacter,
    windowSize
});

export default comicApp;