import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getArtists } from '../actions/songs';

const Artists = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(st => st.songs.searchTerm);



    console.log(`search term in artists component: ${searchTerm}`);
    // const search

    useEffect(() => {
        const getAllArtists = async (searchTerm) => {
            try {
                console.log(`search term: ${searchTerm}`)
                dispatch(getArtists(searchTerm));
            } catch (error) {
                return error;
            }
        }
        getAllArtists(searchTerm);
    }, [searchTerm])

    return <div>All artists</div>
}

export default Artists;