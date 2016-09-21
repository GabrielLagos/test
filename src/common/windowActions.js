/**
 * Created by gooba on 21/09/2016.
 */
import {action} from './rootStore'
import {CHANGE_WINDOW_SIZE} from './windowReducers'

var addEvent = function (object, type, callback) {
    if (object == null || typeof(object) == 'undefined') {
        return;
    }

    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on" + type] = callback;
    }
};

exports.watchWindowSize = () => {
    addEvent(window, "resize", function (event) {
        var size = {
            width: window.innerWidth || document.body.clientWidth,
            height: window.innerHeight || document.body.clientHeight
        };

        action({
            type: CHANGE_WINDOW_SIZE,
            payload: {
                width: size.width,
                height: size.height
            }
        });
        console.log('resized');
    });
};