import React from 'react';
import {addSongToFavorite} from '../actions/users';
import {removeSongFromFavorite} from '../actions/users'; 
import {checkIfFavorited} from '../actions/songs';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SongDetail = () => {
    const username = useSelector(st => st.users.user.username);
    const songsId = useSelector(st => st.users.user.favoriteSongs);
    const isFavorited = useSelector(st => st.songs.isFavorited);

    const token = useSelector(st => st.users.token);
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    console.log(params);

    let songId = params.songid;

    console.log(`username: ${username}, song id: ${songId}`);
    console.log(`check songs' id: ${songsId}`);

    dispatch(checkIfFavorited(songId, songsId, username));

    // const ifFavorited = dispatch(checkIfFavorited(songId, songsId, username));
    // console.log(`check if this song is added to favorited: ${JSON.stringify(ifFavorited)}`);

    // add the selected song to the current user's favorite song's list
    const handleAdd = (username, songId, token) => {
        try {
            dispatch(addSongToFavorite(username, songId, token));
        } catch (error) {
            console.error(`song detail error about adding: ${error}`);
        }
    }

    // remove a favorite song from song's list
    const handleRemove = (username, songId, token) => {
        try {
            dispatch(removeSongFromFavorite(username, songId, token));
        } catch (error) {
            console.error(`song detail error about removing: ${error}`);
        }
    }

    return (
        <div className="container">
            <h1>this song</h1>
            {isFavorited 
                ? <button onClick={() => handleRemove(username, songId, token)}>Undo the favorite</button>
                : <button onClick={() => handleAdd(username, songId, token)}>Add to Favorite</button>
            }
        </div>    
    )
}

export default SongDetail;