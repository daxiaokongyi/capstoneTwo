import axios from 'axios';
import {FETCH_SONGS} from '../actions/types';
const API_URL = "http://localhost:3001";

console.log(API_URL);

// get songs based on song's name 
export function fetchSongsFromAPI(searchTerm) {
    return async function (dispatch) {
        console.log('hi');
        console.log(`Search term: ${searchTerm}`);
        const result = await axios.get(`${API_URL}/applemusic/songs/${searchTerm}`);
        console.log(result.data);
        return dispatch(getSongs(result.data));
    }
}

function getSongs (songs) {
    return {
        type: FETCH_SONGS,
        data: songs
    }
}



