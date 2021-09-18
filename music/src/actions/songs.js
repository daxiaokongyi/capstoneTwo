import axios from 'axios';
import {FETCH_SONGS, CHECK_IF_FAVORITED, CHECK_FAVORITES_ERRORS, GET_SONG_DETAIL, FAV_BUTTON_CLICKED} from '../actions/types';
const API_URL = "http://localhost:3001";

// get songs based on song's name 
export function fetchSongsFromAPI(searchTerm) {
    return async function (dispatch) {
        const result = await axios.get(`${API_URL}/applemusic/songs/${searchTerm}`);
        // console.log(JSON.stringify(result.data));
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

export function fetchSongDetail(songId, username) {
    return async function (dispatch) {
        const result = await axios.post(`${API_URL}/applemusic/songs/songDetail/${songId}`, {
            username
        });

        return dispatch(getSongDetail(result.data));
    }
}

function getSongDetail (songDetailData){
    return {
        type: GET_SONG_DETAIL,
        data: songDetailData
    }
}

export function isFavBtnClicked(favBtnClicked) {
    return ({
        type: FAV_BUTTON_CLICKED,
        data: favBtnClicked
    })
}