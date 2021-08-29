import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignupForm from './SignupForm';
import {sendSignupToAPI} from '../actions/users'; 

const Signup = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // add a new user and save it to the server
    const signup = ({username, password, firstName, lastName, email}) => {
        dispatch(sendSignupToAPI(username, password, firstName, lastName, email));
        history.push(`/users/${username}`);
    }

    // return back to homepage if cancel
    const cancel = () => {
        history.push('/');
    }

    return (
        <main>
            <h1>Register</h1>
            <SignupForm save={signup} cancel={cancel}/>
        </main>
    )
}

export default Signup;