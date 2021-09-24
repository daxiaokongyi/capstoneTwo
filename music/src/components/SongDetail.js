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
    const IMAGE_DIMS = 150;

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
    // console.log(`chck url: ${songDetail.attributes.artwork.url}`);

    console.log(`check detail: ${JSON.stringify(songDetail)}`);

    // if (Object.keys(songDetail).length === 0) {
    //     history.push('/');
    // }

    let songName = songDetail.attributes ? songDetail.attributes.name : "";
    let artist = songDetail.attributes ? songDetail.attributes.artistName : "";
    // let genreName = songDetail.attributes.songGenreNames;

    const token = useSelector(st => st.users.token);

    const handleAdd = (songId, songName, artist, username, token) => {
        try {
            dispatch(isFavBtnClicked(true));

            if (!token && Object.keys('addFavErrs').length !== 0) {
                history.push('/signin');
                // setFavErr(true)
                // setfaved(false);
            } else {
                dispatch(addSongToFavorite(songId, songName, artist, username, token));
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

    const makeImageTag = (url) => {    
        // replace w for width and h for height
        url = url.replace(/\{(w|h)\}/g, IMAGE_DIMS); 
        console.log(`url: ${url}`);

        return <img src={url} className="image"/>
    }

    const handleClick = () => {
        history.push(`/user/${username}`);
    }

    return (
        <div className="container">
            <h1>{songDetail.attributes ? songDetail.attributes.name : ""}</h1>
            <p>{songDetail.attributes ? songDetail.attributes.artistName: ""}</p>
            {/* <img src={songDetail.attributes ? makeImageTag(songDetail.attributes.artwork.url) : ''} alt="url" /> */}
            <p>Genre Name: {songDetail.attributes && songDetail.attributes.genreNames.map(each => (<span>{each} </span>))}
            </p>
            <p>Release Date: {songDetail.attributes && songDetail.attributes.releaseDate}</p>
            <p>Album Name: {songDetail.attributes && songDetail.attributes.albumName}</p>
            <p>Composer Name: {songDetail.attributes && songDetail.attributes.composerName}</p>
            <div>{songDetail.attributes ? makeImageTag(songDetail.attributes.artwork.url) : null}</div>
            <div>
                {faved 
                    ? <button onClick={() => handleRemove(username, songId, token)}>Undo the favorite</button>
                    : <button onClick={() => handleAdd(songId, songName, artist, username, token)}>Add to Favorite</button>
                }
            </div>
            <div>
                <button onClick={handleClick}>Back To User's Page</button>
            </div>
        </div>    
    )
}

export default SongDetail;