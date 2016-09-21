/**
 * Created by gooba on 19/09/2016.
 */
// import "isomorphic-fetch";
const API_KEY = '072396c06e21f60ebd2a809681c932fd';
let baseUrl = 'http://gateway.marvel.com:80/v1/public/';
let comicUrl = `${baseUrl}comics?orderBy=-onsaleDate&limit=80&apikey=${API_KEY}`;
let charactersUrl = `${baseUrl}comics?orderBy=-onsaleDate&limit=10&apikey=${API_KEY}`;

export default class services {

    static comics() {
        return fetch(comicUrl, {
            method: "GET",
            mode: "cors",
            cache: "default"
        })
            .then(response => response.json())
            .catch(error => error);
    }

    static characters() {
        return fetch(charactersUrl)
            .then(response => response.json())
            .catch(error => error);
    }
}

