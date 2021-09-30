import {FETCH_SONGS, LOG_OUT, GET_SONG_DETAIL, FAV_BUTTON_CLICKED, GET_ALL_ARTISTS, GET_ALL_SONGS, GET_ALL_ALBUMS, GET_ALL_PLAYLISTS, GET_ALL_VIDEOS} from '../actions/types';

const INITIAL_STATE = {
    songs: [],
    artists: [],
    albums: [],
    musicVideos: [],
    playlists: [],
    songDetail: {},
    isFavBtnClicked: false,
    searchTerm: null,
    allArtists: [],
    allSongs: [],
    allAlbums: [],
    allPlaylists: [],
    allVideos: []
}

export default function songsReducer(state=INITIAL_STATE, action) {
    let {data, type} = action;

    switch (type) {
        case FETCH_SONGS:
            return {...state, ...data.songs, searchTerm: data.searchTerm}
        case GET_SONG_DETAIL:
            return {...state, songDetail: {...data}}
        case LOG_OUT:
            return {...state, 
                isFavBtnClicked: false
            }
        case FAV_BUTTON_CLICKED:
            return {...state, isFavBtnClicked: true}
        case GET_ALL_ARTISTS:
            return {...state, allArtists: data}
        case GET_ALL_SONGS:
            return {...state, allSongs: data}
        case GET_ALL_ALBUMS:
            return {...state, allAlbums: data }
        case GET_ALL_PLAYLISTS:
            return {...state, allPlaylists: data}
        case GET_ALL_VIDEOS:
            return {...state, allVideos: data}
        default:
            return {...state, isFavBtnClicked: data}
    }
}