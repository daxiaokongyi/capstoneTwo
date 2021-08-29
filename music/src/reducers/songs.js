import {FETCH_SONGS} from '../actions/types';

const initialState = []

export default function songsReducer(state=initialState, action) {
    switch (action.type) {
        case FETCH_SONGS:
            return [...state.songs]
        default:
            return state
    }
}