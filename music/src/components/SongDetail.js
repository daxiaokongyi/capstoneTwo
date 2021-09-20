import React, {useState, useEffect} from 'react';
import {addSongToFavorite} from '../actions/users';
import {removeSongFromFavorite} from '../actions/users'; 
import {fetchSongDetail, isFavBtnClicked} from '../actions/songs';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 

const SongDetail = () => {
    const params = useParams();
    const username = useSelector(st => st.users.user.username);
    const songId = params.songid;
    const [faved, setfaved] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const addFavErrs = useSelector(st => st.users.add_favorited_errors);

    useEffect(()=> {
        async function getSongDetail(songId, username) {
            let songDetailResult = await dispatch(fetchSongDetail(songId, username));
            setfaved(songDetailResult.data.favorited);
            if (Object.keys(songDetailResult.data).length === 0) {
                history.push('/');
            }
        }
        getSongDetail(songId, username);
    },[dispatch, songId, username]);

    const songDetail = useSelector(st => st.songs.songDetail);

    console.log(`check detail: ${JSON.stringify(songDetail)}`);

    // if (Object.keys(songDetail).length === 0) {
    //     history.push('/');
    // }

    let name = songDetail.songName;
    let artist = songDetail.songArtistName;
    let genreName = songDetail.songGenreNames;

    const token = useSelector(st => st.users.token);

    const handleAdd = (songId, name, artist, username, token) => {
        try {
            dispatch(isFavBtnClicked(true));

            if (!token && Object.keys('addFavErrs').length !== 0) {
                history.push('/signin');
                // setFavErr(true)
                // setfaved(false);
            } else {
                dispatch(addSongToFavorite(songId, name, artist, username, token));
                setfaved(true);
            }
        } catch (error) {
            return `song detail error about adding: ${error}`;
        }
    }

    // remove a favorite song from song's list
    const handleRemove = (username, songId, token) => {
        try {
            dispatch(removeSongFromFavorite(username, songId, token));
            setfaved(false);
        } catch (error) {
            return `song detail error about removing: ${error}`;
        }
    }

    return (
        <div className="container">
            <h1>{songDetail.songName}</h1>
            <p>{songDetail.songArtistName}</p>
            <p>Genre Name: {songDetail.songGenreNames && songDetail.songGenreNames.map(each => (<span>{each}</span>))}
            </p>
            {faved 
                ? <button onClick={() => handleRemove(username, songId, token)}>Undo the favorite</button>
                : <button onClick={() => handleAdd(songId, name, artist, username, token)}>Add to Favorite</button>
            }
        </div>    
    )
}

export default SongDetail;