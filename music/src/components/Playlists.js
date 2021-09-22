import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPlaylists } from '../actions/songs';
import { NavLink } from 'react-router-dom';
import SongDetail from './SongDetail';

const Playlists = () => {
    const IMAGE_DIMS = 150;
    const dispatch = useDispatch();
    const searchTerm = useSelector(st => st.songs.searchTerm);

    console.log(`search term in artists component: ${searchTerm}`);
    // const search
    const playlistResults = useSelector(st => st.songs.allPlaylists);
    console.log(`playlist results: ${playlistResults}`);


    useEffect(() => {
        const getAllPlaylists = async (searchTerm) => {
            try {
                console.log(`search term: ${searchTerm}`)
                dispatch(getPlaylists(searchTerm));
            } catch (error) {
                return error;
            }
        }
        getAllPlaylists(searchTerm);
    }, [searchTerm, dispatch])

    // const songResults = useSelector(st => st.songs.allSongs);
    // console.log(`song results: ${songResults}`);
    const makeImageTag = (url) => {
        // console.log(`url: ${url}`);

        // replace w for width and h for height
        url = url.replace(/\{(w|h)\}/g, IMAGE_DIMS); 
        return <img src={url} alt="url" className="image"/>
    }

    const showTableBody = (playlistResults) => {
        return playlistResults.map((playlist, key) => (
            <tbody>
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{makeImageTag(playlist.attributes.artwork.url)}</td>
                    <td>{playlist.attributes.name}</td>
                    <td>{playlist.attributes.description ? playlist.attributes.description.standard : ''}</td>
                    <td><a href={`${playlist.attributes.url}`}  style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">...</a></td>
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
                    <th scope="col">Cover Image</th>
                    <th scope="col">Playlist Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Playlist Detail</th>
                    </tr>
                </thead>
                {showTableBody(playlistResults)}
            </table>
        </div>
    )
}

export default Playlists;