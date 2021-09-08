import React from 'react';
import {addSongToFavorite} from '../actions/users';
import {checkIfFavorited} from '../actions/songs';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SongDetail = () => {
    const username = useSelector(st => st.users.user.username);
    const songsId = useSelector(st => st.users.user.favoriteSongs);

    const token = useSelector(st => st.users.token);
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    console.log(params);

    let songId = params.songid;

    console.log(`username: ${username}, song id: ${songId}`);
    console.log(`check songs' id: ${songsId}`);

    const ifFavorited = dispatch(checkIfFavorited(songId, songsId, username));
    console.log(`check if this song is added to favorited: ${JSON.stringify(ifFavorited)}`);

    // add the selected song to the current user's favorite song's list
    const handleClick = (username, songId, token) => {
        try {
            dispatch(addSongToFavorite(username, songId, token));
        } catch (error) {
            console.error(`song detail error: ${error}`);
        }
    }

    return (
        <div className="container">
            <h1>this song</h1>
            {ifFavorited.favorited 
                ? <button onClick={() => handleClick(username, songId, token)}>Undo the favorite</button>
                : <button onClick={() => handleClick(username, songId, token)}>Add to Favorite</button>
            }
        </div>    
    )
}

export default SongDetail;