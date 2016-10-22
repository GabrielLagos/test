/**
 * Created by gooba on 23/09/2016.
 */
export const SELECT_CHARACTER = "SELECT_CHARACTER";

exports.selectedCharacter = (state = {}, action) => {
    switch (action.type) {
        case SELECT_CHARACTER:
            return {
                character: action.payload,
                timestamp: Date.now()
            };

        default:
            return state;
    }
};