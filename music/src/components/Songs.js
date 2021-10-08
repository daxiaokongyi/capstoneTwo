import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getSongs } from '../actions/songs';
import { NavLink } from 'react-router-dom';
import './Songs.css';

const Songs = () => {
    const IMAGE_DIMS = 150;
    const dispatch = useDispatch();
    const searchTerm = useSelector(st => st.songs.searchTerm);
    const songResults = useSelector(st => st.songs.allSongs);

    useEffect(() => {
        const getAllSongs = async (searchTerm) => {
            try {
                dispatch(getSongs(searchTerm));
            } catch (error) {
                return error;
            }
        }
        getAllSongs(searchTerm);
    }, [searchTerm, dispatch])

    const makeImageTag = (url) => {
        // replace w for width and h for height
        url = url.replace(/\{(w|h)\}/g, IMAGE_DIMS); 
        return <img src={url} alt="url" className="image"/>
    }

    const showTableBody = (songResults) => {
        return songResults.map((song, key) => (
            <tbody>
                <tr className="table-content">
                    <th scope="row">{key + 1}</th>
                    <td>{makeImageTag(song.attributes.artwork.url)}</td>
                    <td>{song.attributes.name}</td>
                    <td>{song.attributes.artistName}</td>
                    <td>{song.attributes.releaseDate}</td>
                    <td><a href={`${song.attributes.url}`}  style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Check</a></td> 
                    <td><NavLink to={`/song/${song.id}`} className="songtDetail">...</NavLink></td>
                </tr> 
            </tbody>
        ))
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cover Image</th>
                        <th scope="col">Song Name</th>
                        <th scope="col">Artist Name</th>
                        <th scope="col">Release Date</th>
                        <th scope="col">Check Song</th>
                        <th scope="col">Details</th>
                    </tr>
                </thead>
                {showTableBody(songResults)}
            </table>
        </div>
    )
}

export default Songs;