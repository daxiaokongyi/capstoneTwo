import axios from 'axios';
import { SIGN_UP, SIGN_IN, LOG_OUT, GET_CURRENTUSER, EDIT_CURRENTUSER, GET_SIGNUP_ERRORS, GET_SIGNIN_ERRORS, ADD_FAVORITE_SONG, REMOVE_FAVORITE_SONG} from "./types";

const API_URL = "http://localhost:3001";

// action for adding a new user
export const sendSignupToAPI = (username, password, firstName, lastName, email) => {
    return async function (dispatch) {  
        // const result = await axios.post(`${API_URL}/auth/register`, {
        //     username,
        //     password,
        //     firstName,
        //     lastName,   
        //     email
        // }).catch(
        //     err => {
        //         if(err.response) {
        //             console.log(err.response.data.error);
        //         }
        //     }
        // );
        // console.log(result);
        // return dispatch(signup(result.data));   
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
                console.log(err.response.data.error);
                console.log(err.response.data.error.message);
                return dispatch(getSignupErrors(err.response.data.error.message));
            }
        );
        // return dispatch(signup(result.data));   
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
        // const result = await axios.post(`${API_URL}/auth/token`, 
        //     {
        //         username,
        //         password
        //     });

        // return dispatch(signin(result.data));

        await axios.post(`${API_URL}/auth/token`, {
            username,
            password
        }).then(
            result => {
                return dispatch(signin(result.data))
        }).catch(
            err => {
                console.log(err.response.data.error);
                console.log(err.response.data.error.message);
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
export const get_currentUser = (username, token) => {
    return async function (dispatch) {
        console.log(username, token);
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
    console.log(JSON.stringify(updatedUserData));
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
        console.log(`set favorite action: ${username}, ${songId}, ${token}, ${songName}, ${songArtistName}`);
        await axios.post(`${API_URL}/users/${username}/songs/${songId}`, {
            songName,
            songArtistName
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            result => {
                console.log(`see what result will be: ${result}`);
                console.log(`see what result will be: ${JSON.stringify(result)}`);
                console.log(`result.favorited: ${result.data.favorited}`);
                return dispatch(addFavoriteSong(result.data.favorited));
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }
}

const addFavoriteSong = (checkFavorited) => {
    console.log(`action songId: ${checkFavorited}`);
    return {
        type: ADD_FAVORITE_SONG,
        data: checkFavorited
    }
}

// remove a song from user's favorited list
export const removeSongFromFavorite = (username, songId, token) => {
    console.log(`check username, songId, and token: ${username}, ${songId}, ${token}`);

    return async function (dispatch) {
        await axios.delete(`${API_URL}/users/${username}/songs/${songId}`, {
            headers: {
                'Authorization':`Bearer ${token}`
            }
        }).then(
            result => {
                console.log(`see what result will be: ${JSON.stringify(result)}`);
                console.log(`result.favorited: ${result.data.favorited}`);
                return dispatch(removeFavoriteSong(result.data.deletedFavorited));
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }
}

const removeFavoriteSong = (songId) => {
    console.log(`action songId: ${songId}`);
    return {
        type: REMOVE_FAVORITE_SONG,
        data: songId
    }
}