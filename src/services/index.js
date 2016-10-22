/**
 * Created by gooba on 19/09/2016.
 */
// import "isomorphic-fetch";
const API_KEY = '072396c06e21f60ebd2a809681c932fd';
let baseUrl = 'http://gateway.marvel.com:80/v1/public/';
let charactersUrl = `${baseUrl}comics?orderBy=-onsaleDate&limit=10&apikey=${API_KEY}`;

export default class services {

    static comicsStartingWith(partial) {

        let comicUrl = `${baseUrl}comics?titleStartsWith=${partial}&apikey=${API_KEY}`;
        return fetch(comicUrl, {
            method: "GET",
            mode: "cors",
            cache: "default"
        })
            .then(response => response.json())
            .catch(error => error);
    }

    static charactersStartingWith(partial) {
        let comicUrl = `${baseUrl}characters?nameStartsWith=${partial}&apikey=${API_KEY}`;
        return fetch(comicUrl, {
            method: "GET",
            mode: "cors",
            cache: "default"
        })
            .then(response => response.json())
            .catch(error => error);
    }

    static comicsWithCharacters(id) {
        let comicUrl = `${baseUrl}characters/${id}/comics?limit=50&apikey=${API_KEY}`;

        return fetch(comicUrl, {
            method: "GET",
            mode: "cors",
            cache: "default"
        })
            .then(response => response.json())
            .catch(error => error);
    }

    static charactersInComic(id) {
        let comicUrl = `${baseUrl}comics/${id}/characters?apikey=${API_KEY}`;

        return fetch(comicUrl, {
            method: "GET",
            mode: "cors",
            cache: "default"
        })
            .then(response => response.json())
            .catch(error => error);
    }

    static comics(id) {
        let comicUrl;
        if (id<0) {
            comicUrl = `${baseUrl}comics?orderBy=-onsaleDate&apikey=${API_KEY}`;
        } else {
            comicUrl = `${baseUrl}comics/${id}?orderBy=-onsaleDate&limit=20&apikey=${API_KEY}`;
        }
        return fetch(comicUrl, {
            method: "GET",
            mode: "cors",
            cache: "default"
        })
            .then(response => response.json())
            .catch(error => error);
    }

    static characters(id) {
        let charactersUrl = `${baseUrl}characters/${id}?apikey=${API_KEY}`;
        return fetch(charactersUrl)
            .then(response => response.json())
            .catch(error => error);
    }
}

