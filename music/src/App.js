import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Routes from './components/Routes';

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
