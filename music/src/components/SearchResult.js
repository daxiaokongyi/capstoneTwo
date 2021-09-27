import React from 'react';
import {useSelector } from 'react-redux';
import {useHistory, NavLink} from 'react-router-dom';
import defaultImage from '../common/appleMusicDefault.jpeg';
import './SearchResult.css';

const SearchResult = () => {
    const IMAGE_DIMS = 150;
    const IMAGE_W_DIMS = 250;
    const IMAGE_H_DIMS = 150;


    const songs = useSelector(store => store.songs.songs);
    const artists = useSelector(store => store.songs.artists);
    const albums = useSelector(store => store.songs.albums);
    const playlists = useSelector(store => store.songs.playlists);
    const musicVideos = useSelector(store => store.songs.musicVideos);
    const searchTerm = useSelector(store => store.songs.searchTerm);
    const history = useHistory();

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
        console.log(url);
        url = url.replace(/\{(w)\}/g, IMAGE_W_DIMS); 
        console.log(url);
        url = url.replace(/\{(h)\}/g, IMAGE_H_DIMS);
        console.log(url);
        return <img src={url} alt="url" className="videoImage"/>
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
                                        {/* {makeArtistImageTag(artist.artistImageUrl || 'https://www.iphonefaq.org/files/styles/large/public/apple_music.jpg')} */}
                                        {/* {makeArtistImageTag(artist.artistImageUrl || {defaultImage})} */}

                                        <div>
                                            <a href={`${artist.artistUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">
                                                {artist.artistImageUrl ? makeArtistImageTag(artist.artistImageUrl) : <img src={defaultImage} alt="default-image" className="artistImage"/>}
                                            </a>
                                            <p className="card-text">
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
                                            <p><span>{song.songName}-{song.songArtist}</span></p>
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
                                            <p><span>{album.albumName}-{album.albumReleaseDate}</span></p>
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
                                            <p><span>{playlist.playlistName}</span></p>
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
                                            <a href={`${musicVideo.videoUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">
                                                {makeVideoImageTag(musicVideo.videosImageUrl)}
                                            </a>
                                            <p>
                                                <span>{musicVideo.videoName} <a href={`${musicVideo.videoPreviewUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Preview</a>
                                                </span>
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