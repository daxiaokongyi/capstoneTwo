import {FETCH_SONGS, LOG_OUT, GET_SONG_DETAIL, FAV_BUTTON_CLICKED} from '../actions/types';

const INITIAL_STATE = {
    songs: [],
    artists: [],
    albums: [],
    musicVideos: [],
    playlists: [],
    songDetail: {},
    isFavorited: false,
    isFavBtnClicked: false
}

export default function songsReducer(state=INITIAL_STATE, action) {
    let {data, type} = action;
    switch (type) {
        case FETCH_SONGS:
            return {...state, ...data}
        case GET_SONG_DETAIL:
            return {...state, songDetail: {...data}}
        case LOG_OUT:
            return {...state, 
                songs: [], 
                artists: [], 
                albums: [], 
                musicVideos: [],
                playlists: [],
                songDetail: {},
                isFavorited: false,
                isFavBtnClicked: false
            }
        case FAV_BUTTON_CLICKED:
            return {...state, isFavBtnClicked: true}
        default:
            return {...state, isFavBtnClicked: data}
    }
}