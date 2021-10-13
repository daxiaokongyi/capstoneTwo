import React, {useState, useEffect} from 'react';
import {useSelector } from 'react-redux';
import {NavLink, useLocation, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import defaultImage from '../common/appleMusicDefault.jpeg';
import { fetchSongsFromAPI } from '../actions/songs'; 
import LoadingSpinner from '../common/LoadingSpinner';
import './SearchResult.css';

const SearchResult = () => {
    const IMAGE_DIMS = 150;
    const IMAGE_W_DIMS = 250;
    const IMAGE_H_DIMS = 150;
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const search = useLocation().search;
    const searchTerm = new URLSearchParams(search).get('term');
    const fetchResult = useSelector(store => store.songs);
    const fetchSongsErrs = useSelector(st => st.songs.getSongsErrors);
    const notfound = useSelector(st => st.songs.notfound);

    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchSongsFromAPI(searchTerm));
        setIsLoading(false);
    }, [searchTerm, dispatch]);

    // handle result if input format is wrong or not found 
    if (fetchSongsErrs === 'Request path contains unescaped characters') { 
        history.push('/notfound');
    } else if (notfound && notfound.notfound !== '') {
        return <h3 className="not-found">Your search cannot be found! Please try again!</h3>
    }

    const songs = fetchResult.songs;
    const artists = fetchResult.artists;
    const albums = fetchResult.albums;
    const playlists = fetchResult.playlists;
    const musicVideos = fetchResult.musicVideos;

    const makeImageTag = (url) => {
        // replace w for width and h for height
        url = url.replace(/\{(w|h)\}/g, IMAGE_DIMS); 
        return <img src={url} alt="url" className="image"/>
    }

    const makeArtistImageTag = (url) => {
        // replace w for width and h for height
        url = url.replace(/\{(w|h)\}/g, IMAGE_DIMS); 
        return <img src={url} alt="url" className="artistImage"/>
    }

    const makeVideoImageTag = (url) => {
        // replace w for width and h for height
        url = url.replace(/\{(w)\}/g, IMAGE_W_DIMS); 
        url = url.replace(/\{(h)\}/g, IMAGE_H_DIMS);
        return <img src={url} alt="url" className="videoImage"/>
    }

    if (isLoading) {
        return (
            <LoadingSpinner/>
        )
    }

    return (
        <div className="container">
            {artists.length === 0 ? null : 
                <div className="row category">
                    <div className="row justify-content-between">
                        <div className="col-2">
                            <span>Artists:</span>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap">
                        {artists.map(artist => (
                            <div key={artist.artistId}>
                                <div className="card">
                                    <div className="card-body">
                                        <div>
                                            <a href={`${artist.artistUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">
                                                {artist.artistImageUrl ? makeArtistImageTag(artist.artistImageUrl) : <img src={defaultImage} alt="artist" className="artistImage"/>}
                                            </a>
                                            <p className="text">
                                                <span>{artist.artistName}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {songs.length === 0 ? null : 
                <div className="row category">
                    <div className="row justify-content-between">
                        <div className="col-2">
                            <span>Songs:</span>
                        </div>
                        {songs.length < 8 ? null : 
                            <div className="col-2" >
                                <NavLink to={`/songs/${searchTerm}`} style={{"textDecoration": "none", "color": "#f94c57"}}>See All</NavLink>
                            </div>
                        }
                    </div>
                    <div className="d-flex flex-wrap">
                        {songs.map(song => (
                            <div key={song.songId}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-text">
                                            <NavLink to={`/song/${song.songId}`} style={{textDecoration: "none"}}> 
                                                {makeImageTag(song.songImageUrl)}
                                            </NavLink>     
                                            <p className="text"><span>{song.songName}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            } 

            {albums.length === 0 ? null : 
                <div className="row category">     
                    <div className="row justify-content-between">
                        <div className="col-2">
                            <span>Albums:</span>
                        </div>
                        {albums.length < 8 ? null : 
                            <div className="col-2" >
                                <NavLink to={`/albums/${searchTerm}`} style={{"textDecoration": "none", "color": "#f94c57"}}>See All</NavLink>
                            </div>
                        }
                    </div>
                    <div className="d-flex flex-wrap">
                        {albums.map(album => (
                            <div key={album.albumId}>
                                <div className="card">
                                {/* <div className="card" style={{width : "18rem"}}> */}
                                    <div className="card-body">
                                        <div className="card-text">
                                            <a href={`${album.albumUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">                                        
                                            {makeImageTag(album.albumImageUrl)}
                                            </a>
                                            <p className="text"><span>{album.albumName}-{album.albumReleaseDate}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {playlists.length === 0 ? null : 
                <div className="row category">     
                    <div className="row justify-content-between">
                        <div className="col-2">
                            <span>Playlists:</span>
                        </div>
                        {playlists.length < 8 ? null : 
                            <div className="col-2" >
                                <NavLink to={`/playlists/${searchTerm}`} style={{"textDecoration": "none", "color": "#f94c57"}}>See All</NavLink>
                            </div>
                        }
                    </div>
                    <div className="d-flex flex-wrap">
                        {playlists.map(playlist => (
                            <div key={playlist.playlistName}>
                                <div className="card">
                                {/* <div className="card" style={{width : "18rem"}}> */}
                                    <div className="card-body">
                                        <div className="card-text">
                                            <a href={`${playlist.playlistUrl}`} style= {{textDecoration : "none", }} target="_blank"   rel="noreferrer">                                        
                                                {makeImageTag(playlist.playlistImageUrl)}
                                            </a>
                                            <p className="text"><span>{playlist.playlistName}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {musicVideos.length === 0 ? null : 
                <div className="row category">     
                    <div className="row justify-content-between">
                        <div className="col-2">
                            <span>Music Videos:</span>
                        </div>
                        {musicVideos.length < 8 ? null : 
                            <div className="col-2" >
                                <NavLink to={`/videos/${searchTerm}`} style={{"textDecoration": "none", "color": "#f94c57"}}>See All</NavLink>
                            </div>
                        }
                    </div>
                    <div className="d-flex flex-wrap">
                        {musicVideos.map(musicVideo => (
                        <div key={musicVideo.videoId}>
                            <div className="card" style={{width : "18rem"}}>
                                <div className="card-body">
                                        <div className="card-text">
                                            <a href={`${musicVideo.videoPreviewUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">
                                                {makeVideoImageTag(musicVideo.videosImageUrl)}
                                            </a>
                                            <p className="text">
                                                <a href={`${musicVideo.videoUrl}`} style={{textDecoration : "none"}} target="_blank" rel="noreferrer"><span>{musicVideo.videoName}</span></a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }           
        </div>
    )
}

export default SearchResult;