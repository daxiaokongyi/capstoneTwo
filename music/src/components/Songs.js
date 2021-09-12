import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSongsFromAPI} from '../actions/songs';
import {useHistory} from 'react-router-dom';

const Songs = () => {
    const songs = useSelector(store => store.songs.songs);
    const artists = useSelector(store => store.songs.artists);
    const albums = useSelector(store => store.songs.albums);

    console.log(`artists: ${artists}`);

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const handleClick = (songId) => {
        history.push(`/songs/${songId}`);
    }

    useEffect(function () {
        async function fetchSongs() {
            await dispatch(fetchSongsFromAPI());
            setIsLoading(false);
        }

        if (isLoading) fetchSongs();
    }, [dispatch, isLoading]);

    if (isLoading) return <b>Loading ...</b>

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
                                    <a href={`${artist.attributes.url}`} style= {{textDecoration : "none"}} target="_blank">Artist Name: {artist.attributes.name}</a>
                                </p>
                                <p className="card-text">
                                    Genre Name: {artist.attributes.genreNames.map(each => (
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
                                <p>{song.attributes.name}</p>
                                <p>Song ID: {song.id}</p>
                                <h5 className="card-title">
                                    <a href={`${song.attributes.url}`} style= {{textDecoration : "none"}} target="_blank">Preivew</a>
                                </h5>
                                <p className="card-text">
                                    Artist Name: {song.attributes.artistName}
                                </p>
                                <p> Download Preview: <a href={song.attributes.previews[0].url}>{song.attributes.name}</a>
                                </p>
                                {/* <img src={song.attributes.artwork.url} alt="" /> */}
                                <button onClick={() => handleClick(song.id)}>Check Detail</button>
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
                                    <a href={`${album.attributes.url}`} style= {{textDecoration : "none"}} target="_blank">Album: {album.attributes.name}</a>
                                </p>
                                <p className="card-text">
                                    Artist Name: {album.attributes.artistName}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

                // {songs.map(song => <p>{song.attributes.name}</p>)}
                // {songs.map(song => <a href={song.attributes.previews[0].url}>{song.attributes.name}</a>  )}
                // {songs.map(song => <h1>{song.id}</h1>)}
                // {songs.map(song => <a href={song.attributes.url}>{song.attributes.url}</a>)}
                // {songs.map(song => <img src={song.attributes.artwork.url} alt="" width={song.attributes.artwork.width} 
                // height={song.attributes.artwork.height}/> )}            
        // </div>
    )
}

export default Songs;