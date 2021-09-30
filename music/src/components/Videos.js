import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideos } from '../actions/songs';

const Videos = () => {
    const IMAGE_DIMS = 150;
    const dispatch = useDispatch();
    const searchTerm = useSelector(st => st.songs.searchTerm);
    const videoResults = useSelector(st => st.songs.allVideos);

    useEffect(() => {
        const getAllVideos = async (searchTerm) => {
            try {
                dispatch(getVideos(searchTerm));
            } catch (error) {
                return error;
            }
        }
        getAllVideos(searchTerm);
    }, [searchTerm, dispatch])

    const makeImageTag = (url) => {
        // replace w for width and h for height
        url = url.replace(/\{(w|h)\}/g, IMAGE_DIMS); 
        return <img src={url} alt="url" className="image"/>
    }

    const showTableBody = (videoResults) => {
        return videoResults.map((video, key) => (
            <tbody>
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{makeImageTag(video.attributes.artwork.url)}</td>
                    <td>{video.attributes.name}</td>
                    <td>{video.attributes.releaseDate}</td>
                    <td><a href={`${video.attributes.previews[0] ? video.attributes.previews[0].url : ""}`}  style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Check</a></td>
                    <td><a href={`${video.attributes.url}`}  style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">...</a></td>
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
                    <th scope="col">Video Name</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Video Preview</th>
                    <th scope="col">Video Detail</th>
                    </tr>
                </thead>
                {showTableBody(videoResults)}
            </table>
        </div>
    )
}

export default Videos;