import {FETCH_SONGS} from '../actions/types';
import { ADD_FAVORITE_SONG } from '../actions/types';

const INITIAL_STATE = {
    songs: []
}

export default function songsReducer(state=INITIAL_STATE, action) {
    let {data, type} = action;
    console.log(`reducer check:`);
    console.log(data);
    console.log(type);
    switch (type) {
        case FETCH_SONGS:
            return {...state, ...data}
        default:
            return state
    }
}