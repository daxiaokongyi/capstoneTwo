import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignupForm from './SignupForm';
import {sendSignupToAPI} from '../actions/users'; 

const Signup = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const signup = ({username, password, firstName, lastName, email}) => {
        try {
            dispatch(sendSignupToAPI(username, password, firstName,lastName, email));
            return {success: true};
        } catch (errors) {
            console.error(`Sign up failed, ${errors.response}`);
            return {success: false, errors};
        }
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