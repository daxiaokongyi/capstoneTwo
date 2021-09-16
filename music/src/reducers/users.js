import {SIGN_UP, SIGN_IN, LOG_OUT, GET_CURRENTUSER, EDIT_CURRENTUSER, GET_SIGNUP_ERRORS, GET_SIGNIN_ERRORS, ADD_FAVORITE_SONG, REMOVE_FAVORITE_SONG} from '../actions/types';

const INITIAL_STATE =  {
    token: null,
    user: {},
    signup_errors: [],
    signin_errors: [],
    favorite_songs: [],
    check_favorited_errors: []
}

export default function rootReducer (state = INITIAL_STATE, action) {
    let {type, data, errs} = action;

    switch(type) {
        case SIGN_UP:
            return {...state, token: data.token, signin_errors: [], signup_errors: []};
        case SIGN_IN:
            return {...state, token: data.token, signin_errors: [], signup_errors: []};
        case LOG_OUT:
            return {...state, token: null, user: {}, signin_errors: [], signup_errors: [], favorite_songs: []};
        case GET_CURRENTUSER:
            return {...state, ...data}
        case EDIT_CURRENTUSER:
            return {...state, ...data};
        case GET_SIGNUP_ERRORS:
            return {...state, token: null, signin_errors: [], signup_errors: errs.signupErrs};
        case GET_SIGNIN_ERRORS:
            return {...state, token: null, signin_errors: errs.signinErrs, signup_errors: []};
        case ADD_FAVORITE_SONG:
            return {...state, user: {...state.user, favoriteSongs: [...state.user.favoriteSongs ,data]}}
        case REMOVE_FAVORITE_SONG:
            let newFavoriteSongs = [...state.user.favoriteSongs].filter(song => song !== data);

            return {...state, user: {...state.user, favoriteSongs: [...newFavoriteSongs]}}
        default:
            return state;
    }
}