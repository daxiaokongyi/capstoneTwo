import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSongsFromAPI} from '../actions/songs';

const Songs = () => {
    const songs = useSelector(store => store.songs);
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

    return (
        <div>hi</div>
    )
}

export default Songs;