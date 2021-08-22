import {FETCH_SONGS} from '../actions/types';

export default function songsReducer(state=[], action) {
    switch (action.type) {
        case FETCH_SONGS:
            return [...state.songs]
        default:
            return state
    }
}