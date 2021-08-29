import './App.css';
import React, {useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import jwt from 'jsonwebtoken';
import MusicApi from './api/api';
import LoadingSpinner from './common/LoadingSpinner';
import Navbar from './components/Navbar';
import Routes from './components/Routes';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {get_currentUser} from './actions/users';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = 'music-jin-token';

function App() {
    return (
        <div className="App container">
            <Navbar/>
            <Routes/>
        </div>
    );
}

export default App;
