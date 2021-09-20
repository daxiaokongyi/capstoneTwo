import {FETCH_SONGS, LOG_OUT, GET_SONG_DETAIL, FAV_BUTTON_CLICKED, GET_ALL_ARTISTS} from '../actions/types';

const INITIAL_STATE = {
    songs: [],
    artists: [],
    albums: [],
    musicVideos: [],
    playlists: [],
    songDetail: {},
    isFavorited: false,
    isFavBtnClicked: false,
    searchTerm: null,
    allArtist: []
}

export default function songsReducer(state=INITIAL_STATE, action) {
    let {data, type} = action;
    // console.log(`songs: ${data.songs}`);
    // console.log(`songs search term: ${data.searchTerm}`);

    switch (type) {
        case FETCH_SONGS:
            return {...state, ...data.songs, searchTerm: data.searchTerm}
        case GET_SONG_DETAIL:
            return {...state, songDetail: {...data}}
        case LOG_OUT:
            return {...state, 
                // songs: [], 
                // artists: [], 
                // albums: [], 
                // musicVideos: [],
                // playlists: [],
                // songDetail: {},
                isFavorited: false,
                isFavBtnClicked: false
            }
        case FAV_BUTTON_CLICKED:
            return {...state, isFavBtnClicked: true}
        case GET_ALL_ARTISTS:
            return {...state, allArtist: data}
        default:
            return {...state, isFavBtnClicked: data}
    }
}