import axios from 'axios';
import {
    FETCH_SONGS, 
    CHECK_IF_FAVORITED, 
    CHECK_FAVORITES_ERRORS, 
    GET_SONG_DETAIL, 
    FAV_BUTTON_CLICKED, 
    GET_ALL_SONGS, 
    GET_ALL_ALBUMS, 
    GET_ALL_PLAYLISTS, 
    GET_ALL_VIDEOS,
    GET_SONGS_ERRORS,
    CLEAR_SONGS_ERRORS
} from '../actions/types';
const API_URL = "http://localhost:3001";

// get songs based on song's name 
export function fetchSongsFromAPI(searchTerm) {
    return async function (dispatch) {
        // const result = await axios.get(`${API_URL}/applemusic/songs/${searchTerm}`);
        // return dispatch(getSongsInfo({songs: result.data, searchTerm: `${searchTerm}`}));
        await axios.get(`${API_URL}/applemusic/songs/${searchTerm}`
            ).then (
                result => {
                    console.log(JSON.stringify(result.data));
                    return dispatch(getSongsInfo({songs: result.data, searchTerm: `${searchTerm}`}));
                }
            ).catch (
                err => {
                    // return dispatch(getSongInfoError(`Your search was not found. Please try again`));
                    console.log(`${JSON.stringify(err.response.data.error.message)}`);
                    return dispatch(getSongInfoError(err.response.data.error.message));
                }
            )
    }
}

function getSongsInfo (data) {
    return {
        type: FETCH_SONGS,
        data: data
    }
}

const getSongInfoError = (errorMessage) => {
    return {
        type: GET_SONGS_ERRORS,
        data: errorMessage
    }
}

export function clearFetchSongsErrs() {
    return {
        type: CLEAR_SONGS_ERRORS,
        data: ''
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

        return dispatch(getSongDetail(result.data.songDetail));
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

export function getSongs(searchTerm) {
    return async function (dispatch) {
        const result = await axios.get(`${API_URL}/applemusic/songs/songs/${searchTerm}`);
        return dispatch(getAllSongs(result.data.songs));
    }
}

function getAllSongs(data) {
    return ({
        type: GET_ALL_SONGS,
        data: data
    })
}

export function getAlbums(searchTerm) {
    return async function (dispatch) {
        const result = await axios.get(`${API_URL}/applemusic/songs/albums/${searchTerm}`);
        return dispatch(getAllAlbums(result.data.albums));
    }
}

function getAllAlbums(data) {
    return ({
        type: GET_ALL_ALBUMS,
        data: data
    })
}

export function getPlaylists(searchTerm) {
    return async function (dispatch) {
        const result = await axios.get(`${API_URL}/applemusic/songs/playlists/${searchTerm}`);
        return dispatch(getAllPlaylists(result.data.playlists));
    }
}

function getAllPlaylists(data) {
    return ({
        type: GET_ALL_PLAYLISTS,
        data: data
    })
}

export function getVideos(searchTerm) {
    return async function (dispatch) {
        const result = await axios.get(`${API_URL}/applemusic/songs/videos/${searchTerm}`);
        return dispatch(getAllVideos(result.data.videos));
    }
}

function getAllVideos(data) {
    return ({
        type: GET_ALL_VIDEOS,
        data: data
    })
}