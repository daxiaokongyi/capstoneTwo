import React, {useState, useEffect} from 'react';
import {addSongToFavorite} from '../actions/users';
import {removeSongFromFavorite} from '../actions/users'; 
import {fetchSongDetail} from '../actions/songs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SongDetail = () => {
    const params = useParams();
    const username = useSelector(st => st.users.user.username);
    const songId = params.songid;
    const [faved, setfaved] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=> {
        async function getSongDetail(songId, username) {
            let songDetailResult = await dispatch(fetchSongDetail(songId, username));
            setfaved(songDetailResult.data.favorited);
        }
        getSongDetail(songId, username);
    },[dispatch, songId, username]);

    const songDetail = useSelector(st => st.songs.songDetail);
    let name = songDetail.songName;
    let artist = songDetail.songArtistName;

    const token = useSelector(st => st.users.token);
    const handleAdd = (songId, name, artist, username, token) => {
        try {
            dispatch(addSongToFavorite(songId, name, artist, username, token));
            setfaved(true);

        } catch (error) {
            return error(`song detail error about adding: ${error}`);
        }
    }

    // remove a favorite song from song's list
    const handleRemove = (username, songId, token) => {
        try {
            dispatch(removeSongFromFavorite(username, songId, token));
            setfaved(false);
        } catch (error) {
            console.error(`song detail error about removing: ${error}`);
        }
    }

    return (
        <div className="container">
            <h1>{songDetail.songName}</h1>
            <p>{songDetail.songArtistName}</p>
            <p>Genre Name: {songDetail.songGenreNames.map(each => (
                <span>{each}</span>
            ))}
            </p>

            {faved 
                ? <button onClick={() => handleRemove(username, songId, token)}>Undo the favorite</button>
                : <button onClick={() => handleAdd(songId, name, artist, username, token)}>Add to Favorite</button>
            }
        </div>    
    )
}

export default SongDetail;