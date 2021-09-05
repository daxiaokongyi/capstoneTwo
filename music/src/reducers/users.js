import {SIGN_UP, SIGN_IN, LOG_OUT, GET_CURRENTUSER, EDIT_CURRENTUSER, GET_SIGNUP_ERRORS, GET_SIGNIN_ERRORS, ADD_FAVORITE_SONG} from '../actions/types';

const INITIAL_STATE =  {
    token: null,
    user: {},
    signup_errors: [],
    signin_errors: [],
    favorite_songs: []
}

export default function rootReducer (state = INITIAL_STATE, action) {
    let {type, data, errs} = action;
    console.log(data);
    console.log(errs);

    switch(type) {
        case SIGN_UP:
            return {...state, token: data.token, signin_errors: [], signup_errors: []};
        case SIGN_IN:
            return {...state, token: data.token, signin_errors: [], signup_errors: []};
        case LOG_OUT:
            return {...state, token: null, user: {}, signin_errors: [], signup_errors: []};
        case GET_CURRENTUSER:
            return {...state, ...data};
        case EDIT_CURRENTUSER:
            return {...state, ...data};
        case GET_SIGNUP_ERRORS:
            return {...state, token: null, signin_errors: [], signup_errors: errs.signupErrs};
        case GET_SIGNIN_ERRORS:
            return {...state, token: null, signin_errors: errs.signinErrs, signup_errors: []};
        case ADD_FAVORITE_SONG:
            return {...state, favorite_songs: [...state.favorite_songs, data]}
        default:
            return state;
    }
}