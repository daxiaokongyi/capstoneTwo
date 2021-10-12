import React from 'react';
import { useDispatch } from 'react-redux';
import SigninForm from './SigninForm';
import {sendSigninToAPI, clearSigninErrors} from '../actions/users';

export const TOKEN_STORAGE_ID = 'music-token';

const Signin = () => {
    const dispatch = useDispatch();
    dispatch(clearSigninErrors());

    const signin = ({username, password}) => {
        dispatch(sendSigninToAPI(username, password));
    }

    return (
        <main>
            <h1>Sign In</h1>
            <SigninForm save={signin} />
        </main>
    )
}

export default Signin;