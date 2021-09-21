import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getSongs } from '../actions/songs';
import { NavLink } from 'react-router-dom';
import SongDetail from './SongDetail';

const Songs = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(st => st.songs.searchTerm);

    console.log(`search term in artists component: ${searchTerm}`);
    // const search
    const songResults = useSelector(st => st.songs.allSongs);
    console.log(`song results: ${songResults}`);


    useEffect(() => {
        const getAllSongs = async (searchTerm) => {
            try {
                console.log(`search term: ${searchTerm}`)
                dispatch(getSongs(searchTerm));
            } catch (error) {
                return error;
            }
        }
        getAllSongs(searchTerm);
    }, [searchTerm, dispatch])

    // const songResults = useSelector(st => st.songs.allSongs);
    // console.log(`song results: ${songResults}`);

    const showTableBody = (songResults) => {
        return songResults.map((song, key) => (
            <tbody>
                <tr>
                    <th scope="row">{key}</th>
                    <td>{song.attributes.name}</td>
                    <td>{song.attributes.artistName}</td>
                    <td><NavLink to={`/song/${song.id}`}>...</NavLink></td>
                </tr> 
            </tbody>
        ))
    }

    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Song Name</th>
                    <th scope="col">Artist Name</th>
                    <th scope="col">Details</th>
                    </tr>
                </thead>
                {showTableBody(songResults)}
            </table>
        </div>
    )
}

export default Songs;