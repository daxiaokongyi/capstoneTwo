import {FETCH_SONGS, LOG_OUT, GET_SONG_DETAIL} from '../actions/types';

const INITIAL_STATE = {
    songs: [],
    artists: [],
    albums: [],
    songDetail: {},
    isFavorited: false
}

export default function songsReducer(state=INITIAL_STATE, action) {
    let {data, type} = action;
    switch (type) {
        case FETCH_SONGS:
            return {...state, ...data}
        case GET_SONG_DETAIL:
            return {...state, songDetail: {...data}}
        case LOG_OUT:
            return {...state, songs: [], artists: [], albums: []}
        default:
            return state
    }
}