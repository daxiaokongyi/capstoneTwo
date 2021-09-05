import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSongsFromAPI} from '../actions/songs';

const Songs = () => {
    const songs = useSelector(store => store.songs.songs);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function () {
        async function fetchSongs() {
            await dispatch(fetchSongsFromAPI());
            setIsLoading(false);
        }

        if (isLoading) fetchSongs();
    }, [dispatch, isLoading]);

    if (isLoading) return <b>Loading ...</b>

    console.log(songs);

    const songsName = songs.map(song => {
        console.log(song.attributes.name);
    });

    return (
        <div className="container">
            {songs.map(song => (
                <div className="card" style={{width : "18rem"}}>
                    <div className="card-body">
                        <a href={`/songs/${song.id}`}>{song.attributes.name}</a>
                        <p>Song ID: {song.id}</p>
                        <h5 className="card-title">
                            <a href={`/songs/${song.attributes.url}`} style= {{textDecoration : "none"}} target="_blank">Preivew</a>
                        </h5>
                        <p className="card-text">
                            Artist Name: {song.attributes.artistName}
                        </p>
                        <p> Download Preview: <a href={song.attributes.previews[0].url}>{song.attributes.name}</a>
                        </p>
                    </div>
                </div>
            ))}
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