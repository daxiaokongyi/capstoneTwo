import axios from 'axios';
import { SIGN_UP, SIGN_IN, LOG_OUT, GET_CURRENTUSER, EDIT_CURRENTUSER, GET_SIGNUP_ERRORS, GET_SIGNIN_ERRORS, ADD_FAVORITE_SONG, REMOVE_FAVORITE_SONG, ADD_FAVORITED_ERRORS} from "./types";

const API_URL = "http://localhost:3001";

// action for adding a new user
export const sendSignupToAPI = (username, password, firstName, lastName, email) => {
    return async function (dispatch) {  
        await axios.post(`${API_URL}/auth/register`, {
            username,
            password,
            firstName,
            lastName,   
            email
        }).then(
            result => {
                return dispatch(signup(result.data));
            }
        ).catch(
            err => {
                return dispatch(getSignupErrors(err.response.data.error.message));
            }
        );
    }
}

const signup = (userData) => {
    return {
        type: SIGN_UP,
        data: userData
    }
}

const getSignupErrors = (errorMessage) => {
    return {
        type: GET_SIGNUP_ERRORS, 
        errs: {
            signupErrs: errorMessage
        }
    }
}

// action for signning in
export const sendSigninToAPI = (username, password) => {
    return async function (dispatch) {
        await axios.post(`${API_URL}/auth/token`, {
            username,
            password
        }).then(
            result => {
                console.log(`sign in result: ${JSON.stringify(result.data)}`);
                return dispatch(signin(result.data))
        }).catch(
            err => {
                return dispatch(getSigninErrors(err.response.data.error.message));
        });
    }
}

const signin = (userData) => {
    return {
        type: SIGN_IN,
        data: userData
    }
}

const getSigninErrors = (errorMessage) => {
    return {
        type: GET_SIGNIN_ERRORS, 
        errs: {
            signinErrs: errorMessage
        }
    }
}

// action for logging out
export const logout = () => {
    return {
        type: LOG_OUT,
        data: {
            token: null
        }
    }
}

// action for getting current user 
export const getCurrentUser = (username, token) => {
    return async function (dispatch) {
        const result = await axios.get(`${API_URL}/users/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return dispatch(getUser(result.data.user, token));
    }
}

const getUser = (user, token) => {
    return {
        type: GET_CURRENTUSER,
        data: {
            user,       
            token
        }
    }
}

// action for editting current use
export const sendEditToAPI = (username, updatedUserData, token) => {
    return async function (dispatch) {
        const result = await axios.patch(`${API_URL}/users/${username}`, updatedUserData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return dispatch(editUser(result.data.user, token));
    }
}

const editUser = (user, token) => {
    return {
        type: EDIT_CURRENTUSER,
        data: {
            user,    
            token,
        }
    }
}

export const addSongToFavorite =(songId, songName, songArtistName, username, token) => {
    return async function (dispatch) {
        await axios.post(`${API_URL}/users/${username}/songs/${songId}`, {
            songName,
            songArtistName
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            result => {
                console.log(`${result}`);
                return dispatch(addFavoriteSong(result.data.favorited));
            }
        ).catch(
            err => {
                console.log(`unauthorized error?`);
                console.log(`${err.response.data.error.message}`);
                console.log(`${err.response.data.error.status}`);

                return dispatch(addFavoriteError({
                    message: err.response.data.error.message,
                    status: err.response.data.error.status
                }));
            }
        )
    }
}

const addFavoriteSong = (checkFavorited) => {
    return {
        type: ADD_FAVORITE_SONG,
        data: checkFavorited
    }
}

const addFavoriteError = (addFavErrs) => {
    return {
        type: ADD_FAVORITED_ERRORS,
        data: addFavErrs
    }
}



// remove a song from user's favorited list
export const removeSongFromFavorite = (username, songId, token) => {
    return async function (dispatch) {
        await axios.delete(`${API_URL}/users/${username}/songs/${songId}`, {
            headers: {
                'Authorization':`Bearer ${token}`
            }
        }).then(
            result => {
                return dispatch(removeFavoriteSong(result.data.deletedFavorited));
            }
        ).catch(
            error => {
                return error;
            }
        )
    }
}

const removeFavoriteSong = (songId) => {
    return {
        type: REMOVE_FAVORITE_SONG,
        data: songId
    }
}