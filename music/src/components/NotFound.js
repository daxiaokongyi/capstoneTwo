import React from "react";
import './NotFound.css';
import { clearFetchSongsErrs } from '../actions/songs'; 
import { useDispatch } from 'react-redux';

const NotFound = () => {
    const dispatch = useDispatch();
    dispatch(clearFetchSongsErrs());
    return <h3 className="not-found"> Sorry, your search format cannot be accepted</h3>;
}

export default NotFound;