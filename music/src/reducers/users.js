import {SIGN_UP, SIGN_IN, LOG_OUT, GET_CURRENTUSER, EDIT_CURRENTUSER} from '../actions/types';

const INITIAL_STATE =  {
    token: null,
    user: {}
}

export default function rootReducer (state = INITIAL_STATE, action) {
    let {type, data} = action;
    console.log(data);

    switch(type) {
        case SIGN_UP:
            return {...state, token: data.token};
        case SIGN_IN:
            return {...state, token: data.token};
        case LOG_OUT:
            return {...state, token: null, user: {}};
        case GET_CURRENTUSER:
            return {...state, ...data};
        case EDIT_CURRENTUSER:
            return {...state, ...data};
        default:
            return state;
    }
}