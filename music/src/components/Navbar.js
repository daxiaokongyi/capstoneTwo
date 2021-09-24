import React from 'react';
import { NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../actions/users';
import SearchBox from '../components/SearchBox'

const Navbar = () => {
    const dispatch = useDispatch();

    const token = useSelector(st => st.users.token);
    const user = useSelector(st => st.users.user);

    const signOut = () => {
      dispatch(logout());
    }

    const homeOrSuggestion = (user) => {
      if (user && user.username) {
        return (
          <NavLink className="nav-link" to={`/suggestion`}>
            I-Music
          </NavLink>
        )
      } else {
        <NavLink className="nav-link" to={`/`}>
          I-Music
        </NavLink>
      }
    }

    const loggedInNav = () => {
      return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            {homeOrSuggestion(user)}
            {/* <NavLink className="nav-link" to={`/`}>
              I-Music
            </NavLink> */}
            <NavLink className="nav-link" to={`/user/${user.username}`}>
              Hello {`${user.username}'s`}!
            </NavLink>
          </li>
          <li className="naw-item">
            <NavLink className="nav-link" to="/" onClick={signOut}>
              Log Out
            </NavLink>
          </li>
          <SearchBox/>
        </ul>
      </nav>
      )
    } 

    const loggedOutNav = () => {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="nav-link" to={`/`}>
          I-Music
        </NavLink>          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/signin">
                  Sign In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
            </ul>
            <SearchBox/>
          </div>
        </nav>
      )
    }

    return (
      <div>
        {token ? loggedInNav() : loggedOutNav()}
      </div>
    ) 
}

export default Navbar;