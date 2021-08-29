import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {logout} from '../actions/users';
const Navbar = () => {
    const dispatch = useDispatch();

    const token = useSelector(st => st.users.token);
    const user = useSelector(st => st.users.user);
  
    console.log(token, user);

    const signOut = () => {
      dispatch(logout());
    }

    const loggedInNav = () => {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/:username">
              Hello {`${user.username}'s`}!
            </NavLink>
          </li>
          <li className="naw-item">
            <Link className="nav-link" to="/" onClick={signOut}>Log Out</Link>
          </li>
        </ul>
      )
    } 

    const loggedOutNav = () => {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/signin">
              Sign In
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
      )
    }

    return (
      <nav className="Navigation navbar navbar-expand-md">
        {token ? loggedInNav() : loggedOutNav()}
      </nav>
    );
}

export default Navbar;