import React, {useState} from 'react';
import { fetchSongsFromAPI } from '../actions/songs'; 
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = evt => {
        setSearchTerm(evt.target.value);
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        // do the search
        // searchFor(searchTerm.trim() || undefined);
        dispatch(fetchSongsFromAPI(searchTerm));
        setSearchTerm(searchTerm.trim());
        // console.log(`searchTerm: ${searchTerm}`);
        history.push(`/search?term=${searchTerm}`);
        // return (
        //     <NavLink to={`/search?term=${searchTerm}`}>

        //     </NavLink>
        // )
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    type="text" 
                    name="searchTerm"
                    placeholder="Search ..."
                    onChange={handleChange}
                    value={searchTerm}
                />
                <button className="btn btn-lg btn-primary">
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchBox;