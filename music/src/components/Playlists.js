import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPlaylists } from '../actions/songs';
import './Playlists.css';

const Playlists = () => {
    const IMAGE_DIMS = 150;
    const dispatch = useDispatch();
    const searchTerm = useSelector(st => st.songs.searchTerm);

    // const search
    const playlistResults = useSelector(st => st.songs.allPlaylists);

    useEffect(() => {
        const getAllPlaylists = async (searchTerm) => {
            try {
                dispatch(getPlaylists(searchTerm));
            } catch (error) {
                return error;
            }
        }
        getAllPlaylists(searchTerm);
    }, [searchTerm, dispatch])

    const makeImageTag = (url) => {
        // replace w for width and h for height
        url = url.replace(/\{(w|h)\}/g, IMAGE_DIMS); 
        return <img src={url} alt="url" className="image"/>
    }

    const showTableBody = (playlistResults) => {
        return playlistResults.map((playlist, key) => (
            <tbody>
                <tr className="table-content">
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