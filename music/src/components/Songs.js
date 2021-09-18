import React from 'react';
import {useSelector, } from 'react-redux';
import {useHistory} from 'react-router-dom';

const Songs = () => {
    const IMAGE_DIMS = 150;

    const songs = useSelector(store => store.songs.songs);
    const artists = useSelector(store => store.songs.artists);
    const albums = useSelector(store => store.songs.albums);
    const playlists = useSelector(store => store.songs.playlists);
    const musicVideos = useSelector(store => store.songs.musicVideos);
    const history = useHistory();

    // console.log(JSON.stringify(songs));
    // console.log(JSON.stringify(playlists));

    const handleClick = (songId) => {
        history.push(`/songs/${songId}`);
    }

    const makeImageTag = (url) => {
        // replace w for width and h for height
        url = url.replace(/\{(w|h)\}/g, IMAGE_DIMS); 
        return <img src={url} alt="url"/>
    }

    return (
        <div className="container">
            <div className="row" style={{"border": "blue 1px solid", "margin": "0.5rem 0", "padding": "0.5rem 0", "borderRadius": "0.6rem"}}>
                <p>Artists: </p>
                <p>See All</p>
                {artists.map(artist => (
                    <div className="col" key={artist.artistId}>
                        <div className="card" style={{width : "18rem"}}>
                            <div className="card-body">
                                {makeImageTag(artist.artistImageUrl)}
                                <p className="card-title">
                                    <a href={`${artist.artistUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Artist Name: {artist.artistName}</a>
                                </p>
                                <p className="card-text">
                                    Genre Name: {artist.artistGenreNames.map(each => (
                                        <span key="{each}">{each}</span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row" style={{"border": "blue 1px solid", "margin": "0.5rem 0", "padding": "0.5rem 0", "borderRadius": "0.6rem"}}>
                <p>Songs: </p>       
                <p>See All</p>
                {songs.map(song => (
                    <div className="col" key={song.songId}>
                        <div className="card" style={{width : "18rem"}}>
                            <div className="card-body">
                                {makeImageTag(song.songImageUrl)}
                                <p>{song.songName}</p>
                                <p>Song ID: {song.songId}</p>
                                <h5 className="card-title">
                                    <a href={`${song.songPreview}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Preivew</a>
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
            <div className="row" style={{"border": "blue 1px solid", "margin": "0.5rem 0", "padding": "0.5rem 0", "borderRadius": "0.6rem"}}>     
                <p>Albums: </p>
                <p>See All</p>
                {albums.map(album => (
                    <div className="col" key={album.albumId}>
                        <div className="card" style={{width : "18rem"}}>
                            <div className="card-body">
                                {makeImageTag(album.albumImageUrl)}
                                <p className="card-title">
                                    <a href={`${album.albumUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Album: {album.albumName}</a>
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
            <div className="row" style={{"border": "blue 1px solid", "margin": "0.5rem 0", "padding": "0.5rem 0", "borderRadius": "0.6rem"}}>     
                <p>Playlists: </p>
                <p>See All</p>
                {playlists.map(playlist => (
                    <div className="col" >
                        <div className="card" style={{width : "18rem"}}>
                            <div className="card-body">
                                {makeImageTag(playlist.playlistImageUrl)}
                                <p className="card-title">
                                    <a href={`${playlist.playlistUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Album: {playlist.playlistName}</a>
                                </p>
                                <p className="card-text">
                                    Playlist Description: {playlist.playlistDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row" style={{"border": "blue 1px solid", "margin": "0.5rem 0", "padding": "0.5rem 0", "borderRadius": "0.6rem"}}>     
                <p>Music Videos: </p>
                <p>See All</p>
                {musicVideos.map(musicVideo => (
                    <div className="col" key={musicVideo.videoId}>
                        <div className="card" style={{width : "18rem"}}>
                            <div className="card-body">
                                {makeImageTag(musicVideo.videosImageUrl)}
                                <p className="card-title">
                                    <a href={`${musicVideo.videoUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Music Video: {musicVideo.videoName}</a>
                                </p>
                                <p className="card-title">
                                    <a href={`${musicVideo.videoPreviewUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Music Video Preview</a>
                                </p>
                                <p className="card-title">
                                    <a href={`${musicVideo.videoHlsUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">Music Video HLS Preview</a>
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