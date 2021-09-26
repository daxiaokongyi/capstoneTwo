import React, {useState, useEffect} from 'react';
import { fetchSongsFromAPI } from '../actions/songs'; 
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './SearchBox.css';

const SearchBox = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [searchTerm, setSearchTerm] = useState("");

    // useEffect(() => {
    //     async function getDefaultSongs() {
    //         dispatch(fetchSongsFromAPI(`popular`));
    //         history.push(`/search?term=${`popular`}`);       
    //     }
    //     getDefaultSongs();
    // }, []);

    const handleChange = evt => {
        setSearchTerm(evt.target.value);
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        // do the search
        // searchFor(searchTerm.trim() || undefined);
        dispatch(fetchSongsFromAPI(searchTerm || `popular`));
        setSearchTerm(searchTerm.trim());
        // console.log(`searchTerm: ${searchTerm}`);
        history.push(`/search?term=${searchTerm || `popular`}`);
        // return (
        //     <NavLink to={`/search?term=${searchTerm}`}>

        //     </NavLink>
        // )
    }

    return (
        <form className="form-inline my-2 my-lg-0 search-box" onSubmit={handleSubmit}>
            <input
                // className="form-control form-control-lg flex-grow-1"
                className="form-control mr-sm-2"
                aria-label="Search"
                type="search" 
                name="searchTerm"
                placeholder="Search ..."
                onChange={handleChange}
                value={searchTerm}
            />
            <button className="btn btn-primary" type="submit">
                Search
            </button>
        </form>
    )
}

export default SearchBox;