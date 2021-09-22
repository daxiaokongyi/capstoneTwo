import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAlbums } from '../actions/songs';
import { NavLink } from 'react-router-dom';
import SongDetail from './SongDetail';

const Albums = () => {
    const IMAGE_DIMS = 150;
    const dispatch = useDispatch();
    const searchTerm = useSelector(st => st.songs.searchTerm);

    console.log(`search term in artists component: ${searchTerm}`);
    // const search
    const albumResults = useSelector(st => st.songs.allAlbums);
    console.log(`album results: ${albumResults}`);


    useEffect(() => {
        const getAllAlbums = async (searchTerm) => {
            try {
                console.log(`search term: ${searchTerm}`)
                dispatch(getAlbums(searchTerm));
            } catch (error) {
                return error;
            }
        }
        getAllAlbums(searchTerm);
    }, [searchTerm, dispatch])

    // const songResults = useSelector(st => st.songs.allSongs);
    // console.log(`song results: ${songResults}`);
    const makeImageTag = (url) => {
        // console.log(`url: ${url}`);

        // replace w for width and h for height
        url = url.replace(/\{(w|h)\}/g, IMAGE_DIMS); 
        return <img src={url} alt="url" className="image"/>
    }

    const showTableBody = (albumResults) => {
        return albumResults.map((album, key) => (
            <tbody>
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{makeImageTag(album.attributes.artwork.url)}</td>
                    <td>{album.attributes.name}</td>
                    <td>{album.attributes.artistName}</td>
                    <td>{album.attributes.releaseDate}</td>
                    <td>{album.attributes.copyright}</td>
                    <td><a href={`${album.attributes.url}`}  style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">...</a></td>
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
                    <th scope="col">Album Name</th>
                    <th scope="col">Artist Name</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Copy Right</th>
                    <th scope="col">Album Detail</th>
                    </tr>
                </thead>
                {showTableBody(albumResults)}
            </table>
        </div>
    )
}

export default Albums;