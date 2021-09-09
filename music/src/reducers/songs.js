import {FETCH_SONGS, CHECK_IF_FAVORITED} from '../actions/types';

const INITIAL_STATE = {
    songs: [],
    isFavorited: false
}

export default function songsReducer(state=INITIAL_STATE, action) {
    let {data, type} = action;
    console.log(`reducer check:`);
    console.log(`action.data: ${data}`);
    console.log(type);
    switch (type) {
        case FETCH_SONGS:
            return {...state, ...data}
        case CHECK_IF_FAVORITED:
            return {...state, isFavorited: data.favorited}
        default:
            return state
    }
}