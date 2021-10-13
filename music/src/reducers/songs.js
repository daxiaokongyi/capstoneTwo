import {FETCH_SONGS, LOG_OUT, GET_SONG_DETAIL, FAV_BUTTON_CLICKED, GET_ALL_ARTISTS, GET_ALL_SONGS, GET_ALL_ALBUMS, GET_ALL_PLAYLISTS, GET_ALL_VIDEOS, GET_SONGS_ERRORS, CLEAR_SONGS_ERRORS
} from '../actions/types';

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
    allVideos: [],
    getSongsErrors: '',
}

export default function songsReducer(state=INITIAL_STATE, action) {
    let {data, type} = action;

    switch (type) {
        case FETCH_SONGS:
            if(!Object.keys(data.songs).includes('notfound')) {
                return {...state, ...data.songs, searchTerm: data.searchTerm, notfound: ''}
            } else {
                return {...state, ...data.songs, searchTerm: data.searchTerm}
            }
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
        case GET_SONGS_ERRORS:
            return {...state, getSongsErrors: data}
        case CLEAR_SONGS_ERRORS:
            return {...state, getSongsErrors: ''}
        default:
            return state
    }
}