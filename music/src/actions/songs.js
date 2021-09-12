import axios from 'axios';
import {FETCH_SONGS, CHECK_IF_FAVORITED, CHECK_FAVORITES_ERRORS, GET_FAVORITE_DETAILS} from '../actions/types';
const API_URL = "http://localhost:3001";

console.log(API_URL);

// get songs based on song's name 
export function fetchSongsFromAPI(searchTerm) {
    return async function (dispatch) {
        console.log('hi');
        console.log(`Search term: ${searchTerm}`);
        const result = await axios.get(`${API_URL}/applemusic/songs/${searchTerm}`);
        // console.log(`check song's result data: ${JSON.stringify(result.data.songs)}`);
        // console.log(`check artist's result data: ${JSON.stringify(result.data.artists)}`);
        // console.log(`check albums' result data: ${JSON.stringify(result.data.albums)}`);

        return dispatch(getSongs(result.data));
    }
}

function getSongs (songs) {
    return {
        type: FETCH_SONGS,
        data: songs
    }
}

// check if the selected song is added into favorites
export function checkIfFavorited(songId, songsId, username) {
    return async function (dispatch) {
        await axios.post(`${API_URL}/applemusic/songs/checkfavorited/${songId}`, {
            songsId,
            username
        }).then(
            result => {    
                console.log(`result data: ${JSON.stringify(result.data)}`);
                return dispatch(checkFavorited(result.data));
            }
        ).catch(
            error => {
                return dispatch(checkFavoritedError(error.response.data.error.message));
            }
        )
    }
}

const checkFavorited = (ifFavorited) => {
    console.log(`check ifFavorited ${JSON.stringify(ifFavorited)}`);
    return {
        type: CHECK_IF_FAVORITED,
        data: ifFavorited
    }
}

const checkFavoritedError = (errorMessage) => {
    return {
        type: CHECK_FAVORITES_ERRORS, 
        errs: {
            checkFavoritedErrs: errorMessage
        }
    }
}