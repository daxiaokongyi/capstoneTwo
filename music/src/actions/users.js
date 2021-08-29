import axios from 'axios';
import { SIGN_UP, SIGN_IN, LOG_OUT, GET_CURRENTUSER, EDIT_CURRENTUSER } from "./types";

const API_URL = "http://localhost:3001";

// action for adding a new user
export const sendSignupToAPI = (username, password, firstName, lastName, email) => {
    return async function (dispatch) {
        const result = await axios.post(`${API_URL}/auth/register`, {
            username,
            password,
            firstName,
            lastName,   
            email
        });
        return dispatch(signup(result.data));
    }
}

const signup = (userData) => {
    return {
        type: SIGN_UP,
        data: userData
    }
}

// action for signning in
export const sendSigninToAPI = (username, password) => {
    return async function (dispatch) {
        const result = await axios.post(`${API_URL}/auth/token`, 
            {
                username,
                password
            });

        return dispatch(signin(result.data));
    }
}

const signin = (userData) => {
    return {
        type: SIGN_IN,
        data: userData
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
