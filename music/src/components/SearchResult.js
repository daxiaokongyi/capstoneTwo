import React from 'react';
import {useSelector } from 'react-redux';
import {useHistory, NavLink} from 'react-router-dom';
import defaultImage from '../common/appleMusicDefault.jpeg';
import './SearchResult.css';

const SearchResult = () => {
    const IMAGE_DIMS = 150;

    const songs = useSelector(store => store.songs.songs);
    const artists = useSelector(store => store.songs.artists);
    const albums = useSelector(store => store.songs.albums);
    const playlists = useSelector(store => store.songs.playlists);
    const musicVideos = useSelector(store => store.songs.musicVideos);
    const searchTerm = useSelector(store => store.songs.searchTerm);
    const history = useHistory();

    console.log(`search terms: ${searchTerm}`);

    // console.log(JSON.stringify(songs));
    // console.log(JSON.stringify(playlists));

    console.log('search result');

    const handleClick = (songId) => {
        history.push(`/song/${songId}`);
    }

    const makeImageTag = (url) => {
        // console.log(`url: ${url}`);

        // replace w for width and h for height
        url = url.replace(/\{(w|h)\}/g, IMAGE_DIMS); 
        return <img src={url} alt="url" className="image"/>
    }

    const makeArtistImageTag = (url) => {
        // replace w for width and h for height
        url = url.replace(/\{(w|h)\}/g, IMAGE_DIMS); 
        return <img src={url} alt="url" className="artistImage"/>
    }

    return (
        <div className="container">
            {artists.length === 0 ? null : 
                <div className="row category">
                    <div className="row justify-content-between">
                        <div className="col-2">
                            <span>Artists:</span>
                        </div>
                        {artists.length < 8 ? null : 
                            <div className="col-2" >
                                {/* <a href="/artists" style={{"text-decoration": "none"}}>See All</a> */}
                                <NavLink to={`/artists/${searchTerm}`}>See All</NavLink>
                            </div>
                        }
                    </div>
                    {artists.map(artist => (
                        <div className="col" key={artist.artistId}>
                            <div className="card">
                                <div className="card-body">
                                    {/* {makeArtistImageTag(artist.artistImageUrl || 'https://www.iphonefaq.org/files/styles/large/public/apple_music.jpg')} */}
                                    {/* {makeArtistImageTag(artist.artistImageUrl || {defaultImage})} */}
                                    {artist.artistImageUrl ? makeArtistImageTag(artist.artistImageUrl) : <img src={defaultImage} alt="default-image" className="artistImage"/>}

                                    <p className="card-title">
                                        <a href={`${artist.artistUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">{artist.artistName}</a>
                                    </p>
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
                                <NavLink to={`/songs/${searchTerm}`}>See All</NavLink>
                            </div>
                        }
                    </div>
                    {songs.map(song => (
                        <div className="col" key={song.songId}>
                            <div className="card" style={{width : "18rem"}}>
                                <div className="card-body">
                                    {makeImageTag(song.songImageUrl)}
                                    <p>{song.songName} {song.songArtist}</p>
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
                                    <button onClick={() => handleClick(song.songId)}>Check Detail</button>
                                </div>
                            </div>
                        </div>
                    ))}
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
                                <NavLink to={`/albums/${searchTerm}`}>See All</NavLink>
                            </div>
                        }
                    </div>
                    {albums.map(album => (
                        <div className="col" key={album.albumId}>
                            <div className="card" style={{width : "18rem"}}>
                                <div className="card-body">
                                    {makeImageTag(album.albumImageUrl)}
                                    <p className="card-title">
                                        <a href={`${album.albumUrl}`} style= {{textDecoration : "none"}} target="_blank" rel="noreferrer">{album.albumName} {album.albumArtist}</a>
                                    </p>
                                    {/* <p className="card-text">
                                        Artist Name: 
                                    </p> */}
                                    <p>Release Date: {album.albumReleaseDate}</p>
                                </div>
                            </div>
                        </div>
                    ))}
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
                                <NavLink to={`/playlists/${searchTerm}`}>See All</NavLink>
                            </div>
                        }
                    </div>
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
                                <NavLink to={`/musicVideos/${searchTerm}`}>See All</NavLink>
                            </div>
                        }
                    </div>
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
            }           
        </div>
    )
}

export default SearchResult;