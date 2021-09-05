import React from 'react';
import {addSongToFavorite} from '../actions/users';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SongDetail = () => {
    const token = useSelector(st => st.users.token);
    const username = useSelector(st => st.users.user.username);

    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    console.log(params);

    let songId = params.songid;

    // add the selected song to the current user's favorite song's list
    const handleClick = (token, username, songId) => {
        dispatch(addSongToFavorite(token, username, songId));
    }

    return (
        <div className="container">
            <h1>this song</h1>
            <button onClick={() => handleClick(token, username, songId)}>Add to Favorite</button>
        </div>    
    )
}

export default SongDetail;