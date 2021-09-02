import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SigninForm from './SigninForm';
import {sendSigninToAPI} from '../actions/users';
import { useSelector } from 'react-redux';
import useLocalStorage from '../hooks/useLocalStorage';
import {cancel} from '../actions/users';

export const TOKEN_STORAGE_ID = 'music-token';

const Signin = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userToken = useSelector(st => st.users);

    const signin = ({username, password}) => {
        dispatch(sendSigninToAPI(username, password));
        // setToken(userToken.token);
        console.log(userToken);
        console.log(userToken.token);
        // setToken(userToken.token);
        // console.log(token);
        // history.push(`/users/${username}`);
    }

    return (
        <main>
            <h1>Sign In</h1>
            <SigninForm save={signin} />
        </main>
    )
}

export default Signin;