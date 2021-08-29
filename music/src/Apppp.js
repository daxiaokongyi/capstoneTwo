import './App.css';
import React, {useState, useEffect } from 'react';
import {Route, Switch, NavLink} from 'react-router-dom';
import use from './hooks/useLocalStorage';
import useLocalStorage from './hooks/useLocalStorage';
import jwt from 'jsonwebtoken';
import MusicApi from './api/api';
import LoadingSpinner from './common/LoadingSpinner';
import Navbar from './components/Navbar';
import Routes from './components/Routes';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN = 'music-jin-token';

function App() {
  const [inforLoaded, setInforLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN);
  const [favoriteIds, setFavoriteIds] = useState(new Set([]));

  console.debug(
    "App",
    "infoLoaded: ", inforLoaded,
    "currentUser: ", currentUser,
    "token: ", token
  );

  useEffect(function locadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if(token) {
        try {
          // decode token to get username which is used to get current user through Music Api
          let {username} = jwt.decode(token);
          console.log(`check username in app: ${username}`);

          MusicApi.token = token;
          let currenUser = await MusicApi.getCurrentUser(username);
          setCurrentUser(currenUser);
          setFavoriteIds(new Set(currenUser.favoriteSongs));
          console.log(currenUser.favoriteSongs);
        } catch (error) {
          console.error("App loaduserInfo: problem loading", error);
          setCurrentUser(null);
        }
      }
      setInforLoaded(true);
    }

    setInforLoaded(false);
    getCurrentUser();
  }, [token]);

  // user signup 
  const signup = async (signupData) => {
    try {
      // get token after sign up with data
      let token = await MusicApi.signup(signupData);
      setToken(token);
      return {success: true}
    } catch (error) {
      console.error('Sign up failed', error);
      return {success: false, error};
    }
  }

  // user signin
  const signin = async (signinData) => {
    try {
      let token = await MusicApi.signin(signinData);
      setToken(token);
      return {success: true}
    } catch (error) {
      console.error(`login failed`, error);
      return {success: false, error};
    }
  }

  // log out
  const logout = () => {
    setToken(null);
    setCurrentUser(null);
  }

  // check if the song has already been set as favorite
  const hasSetFavorite = (id) => {
    return favoriteIds.has(id);
  }

  // set favorite songs to the user
  const setFavorite = (id) => {
    // return if the song has already been set as favorite
    if (hasSetFavorite(id)) return;
    // if not, set this song to user
    MusicApi.setFavorite(currentUser.username, id);
    setFavoriteIds(new Set(...favoriteIds, id));
  }

  if (!inforLoaded) return <LoadingSpinner/>;

  return (
    <div className="App container">
      <Navbar logout = {logout} currentuser = {currentUser}/>
      <Routes/>
    </div>
  );
}

export default App;
