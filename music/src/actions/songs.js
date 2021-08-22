import axios from 'axios';
import {FETCH_SONGS} from '../actions/types';
const API_URL = process.env.APP_API_URL

console.log(API_URL);

export function fetchSongsFromAPI() {
    return async function (dispatch) {
        // const result = await axios.get(`${API_URL}/terms=jay+chou&types=songs`);
        const result = await axios.get('https://api.music.apple.com/v1/catalog/us/search?term=james+brown&limit=2&types=artists,albums'); 
        console.log(result.data);
        return dispatch(getSongs(result.data));
    }
}

function getSongs (songs) {
    return {
        type: FETCH_SONGS,
        songs: songs
    }
}

