import React, {useState} from 'react';
import { useSelector } from 'react-redux';


const SigninForm = ({save, cancel}) => {
    const userToken = useSelector(state => state.users);
    console.log(userToken);

    const INITIAL_USERDATA = {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(INITIAL_USERDATA);

    const handleChange = evt => {
        const {name, value} = evt.target;
        setFormData(data => ({
            ...data, 
            [name]:value
        }))
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        console.log(formData);
        save(formData);
        console.log(userToken);
    }

    return(
        <form className="mb-4" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="signin-username">user Name: </label>
                <input 
                    onChange={handleChange}
                    id="signin-username"
                    name="username"
                    type="text" 
                    className="form-control"
                    value={formData.username}
                />
            </div>
            <div className="form-group">
                <label htmlFor="signin-password">Password: </label>
                <input 
                    onChange={handleChange}
                    id="signin-password"
                    name="password"
                    type="text" 
                    className="form-control"
                    value={formData.password}
                />            
            </div>
            <button className="btn btn-primary mr-2">Save</button>
            <button className="btn btn-secondary" onClick={cancel} >Cancel</button>
        </form>
    )
}

export default SigninForm;