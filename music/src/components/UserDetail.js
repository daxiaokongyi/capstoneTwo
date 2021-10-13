import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {getCurrentUser, sendEditToAPI} from '../actions/users';
import { useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import { useHistory, NavLink } from 'react-router-dom';
import Alert from './Alert';
import './UserDetail.css';

const UserDetail = () => {
    const token = useSelector(st => st.users.token);
    const favoritedSongs = useSelector(st => st.users.user.favoriteSongs);
    const editErrors = useSelector(st => st.users.edit_errors);
    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState([]);
    const history = useHistory();

    useEffect(function loadUserInfo() {
        const getUser = async () => {
            if (editErrors.length !== 0) {
                setFormErrors(editErrors);
            } else if (token !== null) {
                let {username} = jwt.decode(token);
                dispatch(getCurrentUser(username, token));
                setFormErrors(editErrors);
            } else {
                history.push('/signin');
            }
        }
        getUser();
    }, [token, dispatch, editErrors]);

    const save = (username, updatedUser) => {
        dispatch(sendEditToAPI(username, updatedUser, token));
        setEditable(false);
        history.push(`/user/${user.username}`);
    }

    const cancel = () => {
        setEditable(false);
    }

    const user = useSelector(st => st.users.user);

    const [formData, setFormData] = useState({
        username: user.username,
        password: "",
        firstName: user.firstName,
        lastName: user.lastName,   
        email: user.email 
    });

    const [editable, setEditable] = useState(false);

    // handlers for non-editable template
    const handleClick = () => {
        history.push("/search");
    }

    const handleEdit = () => {
        setFormData({
            username: user.username,
            password: "",
            firstName: user.firstName,
            lastName: user.lastName,   
            email: user.email 
        });
        setEditable(true);
    }

    const showFavSongs = (favoritedSongs) => {
        if (favoritedSongs) {
            return (
                favoritedSongs.map((each, index) => (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td><NavLink to={`/song/${each[0]}`}>{each[1]}</NavLink></td>
                        <td>{each[2]}</td>
                        <td>{each[3]}</td>
                    </tr>
                ))
            )}
        }

    // show details only when it's not editable
    const nonEditable = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">{user.username}'s Info</h5>
                                <p className="card-text">User Name: {user.username}</p>
                                <p className="card-text">First Name: {user.firstName}</p>
                                <p className="card-text">Last Name: {user.lastName}</p>
                                <p className="card-text">Email: {user.email}</p>
                                <div className="buttons">
                                    <button className="btn btn-primary btn-sm" type="button" onClick={handleClick}>Home Page</button>
                                    <button className="btn btn-primary btn-sm" type="button" onClick={handleEdit}>Edit Profile</button>
                                </div>
                            </div>
                        </div>  
                    </div>
                    {favoritedSongs && favoritedSongs.length === 0 ? null :
                        <div className="col">
                            <h3>Favorited Songs</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Song's Name</th>
                                        <th scope="col">Song's Artist</th>
                                        <th scope="col">Song's Genre Names</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showFavSongs(favoritedSongs)}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        )
    }

    // handlers for editable form
    const handleSubmit = evt => {
        evt.preventDefault();

        let updatedUserData = {
            firstName: formData.firstName,  
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        }

        let username = user.username;        
        save(username, updatedUserData);
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    // show edit form only when it's editable
    const Editable = () => {
        return (
            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="edit-username">User Name: </label>
                    <input
                        onChange={handleChange}
                        id="edit-username"
                        name="username"
                        type="text"
                        className="form-control"
                        value={formData.username}
                        disabled={true}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-firstname">First Name: </label>
                    <input 
                        onChange={handleChange}
                        id="edit-firstname"
                        name="firstName"
                        type="text"
                        className="form-control"
                        value={formData.firstName}
                    />                            
                </div>
                <div className="form-group">
                    <label htmlFor="edit-lastname">Last Name: </label>
                    <input 
                        onChange={handleChange}
                        id="edit-lastname"
                        name="lastName"
                        type="text"
                        className="form-control"
                        value={formData.lastName}
                    />                                       
                </div>
                <div className="form-group">
                    <label htmlFor="edit-email">Email: </label>
                    <input 
                        onChange={handleChange}
                        id="edit-email"
                        name="email"
                        type="text"
                        className="form-control"
                        value={formData.email}
                    />                         
                </div>
                <div className="form-group">
                    <label htmlFor="edit-password"> Confirm Password: </label>
                    <input 
                        onChange={handleChange}
                        id="edit-password"
                        name="password"
                        type="password"
                        className="form-control"
                        value={formData.password}
                    />                              
                </div> 
                <button className="btn btn-primary mr-2">Save</button>
                <button className="btn btn-secondary" onClick={cancel}>Cancel</button>
            </form>
        )
    }

    return (
        <div>
            {formErrors.length !== 0 ? <Alert type='danger' messages={formErrors}/> : null}
            {editable ? Editable() : nonEditable()}
        </div>
    )
}

export default UserDetail;