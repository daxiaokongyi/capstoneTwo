import React, {useState, useEffect} from 'react';
import {useSelector } from 'react-redux';
import {useHistory, NavLink, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import defaultImage from '../common/appleMusicDefault.jpeg';
import { fetchSongsFromAPI } from '../actions/songs'; 
import LoadingSpinner from '../common/LoadingSpinner';
import './SearchResult.css';

const SearchResult = () => {
    const IMAGE_DIMS = 150;
    const IMAGE_W_DIMS = 250;
    const IMAGE_H_DIMS = 150;

    const search = useLocation().search;
    const searchTerm = new URLSearchParams(search).get('term');

    const [loading, setLoading] = useState(true);
    const [dataResult, setDataResult] = useState([]);

    console.log(`loading: ${loading}`);

    console.log(`search item: ${searchTerm}`);
    // const searchTerm = 'Jaychou';
    
    const fetchResult = useSelector(store => store.songs);
    // const songs = useSelector(store => store.songs.songs);
    // const artists = useSelector(store => store.songs.artists);
    // const albums = useSelector(store => store.songs.albums);
    // const playlists = useSelector(store => store.songs.playlists);
    // const musicVideos = useSelector(store => store.songs.musicVideos);
    const songs = fetchResult.songs;
    const artists = fetchResult.artists;
    const albums = fetchResult.albums;
    const playlists = fetchResult.playlists;
    const musicVideos = fetchResult.musicVideos;

    // const searchTerm = useSelector(store => store.songs.searchTerm);
    const history = useHistory();

    const dispatch = useDispatch();
 
    // setLoading(true);
    // console.log(`loading: ${loading}`);


    useEffect(() => {
        dispatch(fetchSongsFromAPI(searchTerm || `popular`));
        setLoading(false);
        // console.log(`loading: ${loading}`)
    }, [dispatch, searchTerm]);

    // useEffect(() => {
    //     async function fetchResults() {
    //         console.log('hello');
    //         // setLoading(true);
    //         await dispatch(fetchSongsFromAPI(searchTerm || `popular`));
    //         setLoading(false);
    //     }

    //     if (loading) {
    //         fetchResults();
    //     }
    // }, [dispatch, searchTerm]);

    const handleClick = (songId) => {
        history.push(`/song/${songId}`);
    }

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
        // console.log(url);
        url = url.replace(/\{(w)\}/g, IMAGE_W_DIMS); 
        // console.log(url);
        url = url.replace(/\{(h)\}/g, IMAGE_H_DIMS);
        // console.log(url);
        return <img src={url} alt="url" className="videoImage"/>
    }

    if (loading) return <LoadingSpinner/>;

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
                                        {/* {makeArtistImageTag(artist.artistImageUrl || 'https://www.iphonefaq.org/files/styles/large/public/apple_music.jpg')} */}
                                        {/* {makeArtistImageTag(artist.artistImageUrl || {defaultImage})} */}

                                        <div>
                                            <a href={`${artist.artistUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">
                                                {artist.artistImageUrl ? makeArtistImageTag(artist.artistImageUrl) : <img src={defaultImage} alt="default-image" className="artistImage"/>}
                                            </a>
                                            <p className="text">
                                                <span>{artist.artistName}</span>
                                            </p>
                                        </div>
                                        {/* <p className="card-text">
                                            Genre Name: {artist.artistGenreNames.map(each => (
                                                <span key="{each}">{each}</span>
                                            ))}
                                        </p> */}
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
                                {/* <a href="/artists" style={{"text-decoration": "none"}}>See All</a> */}
                                <NavLink to={`/songs/${searchTerm}`} style={{"textDecoration": "none", "color": "#f94c57"}}>See All</NavLink>
                            </div>
                        }
                    </div>
                    <div className="d-flex flex-wrap">
                        {songs.map(song => (
                            <div key={song.songId}>
                                <div className="card">
                                    <div className="card-body">
                                        {/* <p>{song.songName}-{song.songArtist}</p> */}
                                        <div className="card-text">
                                            <NavLink to={`/song/${song.songId}`} style={{textDecoration: "none"}}> 
                                                {makeImageTag(song.songImageUrl)}
                                            </NavLink>     
                                            <p className="text"><span>{song.songName}</span></p>
                                        </div>
                                        {/* <p>Song ID: {song.songId}</p> */}
                                        {/* <h5 className="card-title">
                                            <a href={`${song.songPreview}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Preivew</a>
                                        </h5> */}
                                        {/* <p className="card-text">
                                            {song.songArtist}
                                        </p> */}
                                        {/* <p> Download Preview: <a href={song.songDownloadPreview}>{song.songName}</a>
                                        </p> */}
                                        {/* <img src={song.attributes.artwork.url} alt="" /> */}
                                        {/* <button onClick={() => handleClick(song.songId)}>Check Detail</button> */}
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
                                {/* <a href="/artists" style={{"text-decoration": "none"}}>See All</a> */}
                                <NavLink to={`/albums/${searchTerm}`} style={{"textDecoration": "none", "color": "#f94c57"}}>See All</NavLink>
                            </div>
                        }
                    </div>
                    <div className="d-flex flex-wrap">
                        {albums.map(album => (
                            <div key={album.albumId}>
                                <div className="card" style={{width : "18rem"}}>
                                    <div className="card-body">
                                        <div className="card-text">
                                            <a href={`${album.albumUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">                                        
                                            {makeImageTag(album.albumImageUrl)}
                                            </a>
                                            <p className="text"><span>{album.albumName}-{album.albumReleaseDate}</span></p>
                                        </div>
                                        {/* {makeImageTag(album.albumImageUrl)} */}
                                        {/* <p className="card-text">
                                            <a href={`${album.albumUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer"><span>{album.albumName}-{album.albumReleaseDate}</span></a>
                                        </p> */}
                                        {/* <p className="card-text">
                                            Artist Name: 
                                        </p> */}
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
                                {/* <a href="/artists" style={{"text-decoration": "none"}}>See All</a> */}
                                <NavLink to={`/playlists/${searchTerm}`} style={{"textDecoration": "none", "color": "#f94c57"}}>See All</NavLink>
                            </div>
                        }
                    </div>
                    <div className="d-flex flex-wrap">
                        {playlists.map(playlist => (
                            <div>
                                <div className="card" style={{width : "18rem"}}>
                                    <div className="card-body">
                                        <div className="card-text">
                                            <a href={`${playlist.playlistUrl}`} style= {{textDecoration : "none", }} target="_blank" rel="noreferrer">                                        {makeImageTag(playlist.playlistImageUrl)}
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
                                {/* <a href="/artists" style={{"text-decoration": "none"}}>See All</a> */}
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

                                        {/* <p className="card-title">
                                            <a href={`${musicVideo.videoHlsUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Music Video HLS Preview</a>
                                        </p> */}
                                        {/* <p className="card-text">
                                            Music Video duration: {musicVideo.videoDuration}
                                        </p> */}
                                        {/* <p className="card-text">
                                            Music Video Release Date: {musicVideo.videoReleaseDate}
                                        </p> */}
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