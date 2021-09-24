import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { fetchSongsFromAPI } from '../actions/songs'; 
import { useHistory } from 'react-router-dom';

const Suggestion = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=> {
        async function getSuggestionSongs(genreName) {
            dispatch(fetchSongsFromAPI(genreName));
            history.push(`/search?term=${genreName}`);
        }
        getSuggestionSongs('mandopop');
    },[]);
    return(
        <div>
            Suggestion Page
        </div>
    )
}

export default Suggestion;