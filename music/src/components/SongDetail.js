import React, {useState, useEffect} from 'react';
import {addSongToFavorite} from '../actions/users';
import {removeSongFromFavorite} from '../actions/users'; 
import {checkIfFavorited,fetchSongDetail} from '../actions/songs';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SongDetail = () => {
    const params = useParams();
    const username = useSelector(st => st.users.user.username);
    const songId = params.songid;
    const [faved, setfaved] = useState(false);


    // let name = '';
    // let artistName = '';

    useEffect(()=> {
        async function getSongDetail(songId, username) {
            let songDetailResult = await dispatch(fetchSongDetail(songId, username));
            console.log(`song detail result: ${JSON.stringify(songDetailResult)}`);
            console.log(JSON.stringify(songDetailResult.data.songName));
            console.log(JSON.stringify(songDetailResult.data.songArtistName));
            // name = songDetailResult.data.songName;
            // artistName = songDetailResult.data.songArtistName;
            setfaved(songDetailResult.data.favorited);
        }
        getSongDetail(songId, username);
    },[]);

    // let songsId = useSelector(st => st.users.user.favoriteSongs);
    // songsId = songsId.map(each => each[0]);
    const songDetail = useSelector(st => st.songs.songDetail);
    console.log(`check name and artist: ${songDetail.songName}, ${songDetail.songArtistName}`);
    let name = songDetail.songName;
    let artist = songDetail.songArtistName;

    // let isFavorited = useSelector(st => st.songs.songDetail.favorited);

    console.log(`song detail: ${JSON.stringify(songDetail)}`);

    const token = useSelector(st => st.users.token);
    const history = useHistory();
    const dispatch = useDispatch();

    // console.log(params);

    console.log(`username: ${username}, song id: ${songId}`);
    console.log(`song name: ${name}, song artist: ${artist}`);


    // console.log(`check songs' id: ${songsId}`);




    // dispatch(checkIfFavorited(songId, songsId, username));
    // dispatch(fetchSongDetail(songId, songsId, username));

    // const ifFavorited = dispatch(checkIfFavorited(songId, songsId, username));
    // console.log(`check if this song is added to favorited: ${JSON.stringify(ifFavorited)}`);

    // add the selected song to the current user's favorite song's list

    // console.log(`check name and artist name: ${name}, ${artistName}`);

    const handleAdd = (songId, name, artist, username, token) => {
        try {
            console.log(`song id, name and artist name, ${songId} ${name}, ${artist}`);

            dispatch(addSongToFavorite(songId, name, artist, username, token));
            setfaved(true);

        } catch (error) {
            console.error(`song detail error about adding: ${error}`);
        }
    }

    // remove a favorite song from song's list
    const handleRemove = (username, songId, token) => {
        console.log(`check username, songId, and token: ${username}, ${songId}, ${token}`);

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