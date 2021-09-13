import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSongsFromAPI} from '../actions/songs';
import {useHistory} from 'react-router-dom';

const Songs = () => {
    const songs = useSelector(store => store.songs.songs);
    const artists = useSelector(store => store.songs.artists);
    const albums = useSelector(store => store.songs.albums);
    const playlists = useSelector(store => store.songs.playlists);
    const musicVideos = useSelector(store => store.songs.musicVideos);

    console.log(`artists: ${artists}`);

    const dispatch = useDispatch();
    // const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const handleClick = (songId) => {
        history.push(`/songs/${songId}`);
    }

    // useEffect(function () {
    //     async function fetchSongs() {
    //         await dispatch(fetchSongsFromAPI());
    //         setIsLoading(false);
    //     }

    //     if (isLoading) fetchSongs();
    // }, [dispatch, isLoading]);

    // if (isLoading) return <b>Loading ...</b>

    // console.log(songs);

    return (
        <div className="container">
            <div className="row" style={{"border": "blue 1px solid", "margin": "0.5rem 0", "padding": "0.5rem 0", "border-radius": "0.6rem"}}>
                <p>Artists: </p>
                {artists.map(artist => (
                    <div className="col">
                        <div className="card" style={{width : "18rem"}}>
                            <div className="card-body">
                                <p className="card-title">
                                    <a href={`${artist.artistUrl}`} style= {{textDecoration : "none"}} target="_blank">Artist Name: {artist.artistName}</a>
                                </p>
                                <p className="card-text">
                                    Genre Name: {artist.artistGenreNames.map(each => (
                                        <span>{each}</span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row" style={{"border": "blue 1px solid", "margin": "0.5rem 0", "padding": "0.5rem 0", "border-radius": "0.6rem"}}>
                <p>Songs: </p>       
                {songs.map(song => (
                    <div className="col">
                        <div className="card" style={{width : "18rem"}}>
                            <div className="card-body">
                                <p>{song.songName}</p>
                                <p>Song ID: {song.songId}</p>
                                <h5 className="card-title">
                                    <a href={`${song.songPreview}`} style= {{textDecoration : "none"}} target="_blank">Preivew</a>
                                </h5>
                                <p className="card-text">
                                    Artist Name: {song.songName}
                                </p>
                                <p> Download Preview: <a href={song.songDownloadPreview}>{song.songName}</a>
                                </p>
                                {/* <img src={song.attributes.artwork.url} alt="" /> */}
                                <button onClick={() => handleClick(song.songId)}>Check Detail</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row" style={{"border": "blue 1px solid", "margin": "0.5rem 0", "padding": "0.5rem 0", "border-radius": "0.6rem"}}>     
                <p>Albums: </p>
                {albums.map(album => (
                    <div className="col">
                        <div className="card" style={{width : "18rem"}}>
                            <div className="card-body">
                                <p className="card-title">
                                    <a href={`${album.albumUrl}`} style= {{textDecoration : "none"}} target="_blank">Album: {album.albumName}</a>
                                </p>
                                <p className="card-text">
                                    Artist Name: {album.albumArtist}
                                </p>
                                <p>Release Date: {album.albumReleaseDate}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row" style={{"border": "blue 1px solid", "margin": "0.5rem 0", "padding": "0.5rem 0", "border-radius": "0.6rem"}}>     
                <p>Playlists: </p>
                {playlists.map(playlist => (
                    <div className="col">
                        <div className="card" style={{width : "18rem"}}>
                            <div className="card-body">
                                <p className="card-title">
                                    <a href={`${playlist.playlistUrl}`} style= {{textDecoration : "none"}} target="_blank">Album: {playlist.playlistName}</a>
                                </p>
                                <p className="card-text">
                                    Playlist Description: {playlist.playlistDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row" style={{"border": "blue 1px solid", "margin": "0.5rem 0", "padding": "0.5rem 0", "border-radius": "0.6rem"}}>     
                <p>Music Videos: </p>
                {musicVideos.map(musicVideo => (
                    <div className="col">
                        <div className="card" style={{width : "18rem"}}>
                            <div className="card-body">
                                <p className="card-title">
                                    <a href={`${musicVideo.videoUrl}`} style= {{textDecoration : "none"}} target="_blank">Music Video: {musicVideo.videoName}</a>
                                </p>
                                <p className="card-title">
                                    <a href={`${musicVideo.videoPreviewUrl}`} style= {{textDecoration : "none"}} target="_blank">Music Video Preview</a>
                                </p>
                                <p className="card-title">
                                    <a href={`${musicVideo.videoHlsUrl}`} style= {{textDecoration : "none"}} target="_blank">Music Video HLS Preview</a>
                                </p>
                                <p className="card-text">
                                    Music Video duration: {musicVideo.videoDuration}
                                </p>
                                <p className="card-text">
                                    Music Video Release Date: {musicVideo.videoReleaseDate}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Songs;