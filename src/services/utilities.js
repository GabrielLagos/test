/**
 * Created by gooba on 22/09/2016.
 */

exports.sleep = function (timeInMs) {
    return new Promise((resolve) => setTimeout(resolve, timeInMs));
};

let bodyDiv = document.createElement("div");
bodyDiv.className = "bodyDiv";
bodyDiv = document.body.appendChild(bodyDiv);

exports.clearHomeScreen = function() {
    while( bodyDiv.firstChild ){
        bodyDiv.removeChild( bodyDiv.firstChild );
    }
};


export const standard_small = 'standard_small';
export const standard_medium = 'standard_medium';
export const standard_large = 'standard_large';
export const standard_xlarge = 'standard_xlarge';
export const standard_fantastic = 'standard_fantastic';
export const standard_amazing = 'standard_amazing';

exports.thumbnail = (comic, size) => {
    var image = comic.thumbnail.path;
    var ext = comic.thumbnail.extension;
    return `${image}/${size}.${ext}`;
};

