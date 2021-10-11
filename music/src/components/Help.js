import React from 'react';
import './Help.css';

const Help = () => {
    return (
        <div className='container help-container'>
            <div className='row'>
                <div className='col'>
                    <div class="card help-card">
                        <div class="card-header">
                            <i class="fas fa-user-plus"></i> <b>Account Setting</b>
                        </div>
                        <div class="card-body help-body">
                            <p class="card-text">
                                <ul>
                                    <li>
                                        Sign up - Allow user to create an account. It requires username, last name, email, and passoword. 
                                    </li>
                                    <li>
                                        Sign in - Once user signed up an account, user can sign in using username and password.
                                    </li>
                                    <li>
                                        Sign out - allows users to log out of their account
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div class="card help-card">
                        <div class="card-header">
                            <i class="fas fa-search"></i> <b>Search</b>
                        </div>
                        <div class="card-body help-body">
                            <p class="card-text">
                                <ul>
                                    <li>
                                        Search function allows user to retrieve information about albums, songs, artists, playlists, and music videos provided by Apple Music API.
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div class="card help-card">
                        <div class="card-header">
                            <i class="far fa-address-card"></i> <b>User Profile</b>
                        </div>
                        <div class="card-body help-body">
                            <p class="card-text">
                                <ul>
                                    <li>
                                        User profile shows the detailed information of a user, including username, first name, last name, and email.
                                    </li>
                                    <li>
                                        User is allowed to edit his/her profile by providing the correct password. 
                                    </li>
                                    <li>
                                        Also user is able to add a song to his/her favorite list.
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div class="card help-card">
                        <div class="card-header">
                            <i class="far fa-thumbs-up"></i> <b>You May Like</b>
                        </div>
                        <div class="card-body help-body">
                            <p class="card-text">
                                <ul>
                                    <li>
                                        After a registered user add a song to his/her favorite list, application will provide information about albums, songs, artists, playlists, and music videos based on user's preferred category by clicking I-Music.
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Help;