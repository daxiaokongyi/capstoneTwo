import React, {useState, useEffect} from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Alert from './Alert';

const SigninForm = ({save}) => {
    const token = useSelector(st => st.users.token);   
    const signinErrors = useSelector(st => st.users.signin_errors);
    console.log(token);

    const INITIAL_USERDATA = {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(INITIAL_USERDATA);
    const [userToken, setUserToken] = useState(null);
    const [formErrors, setFormErrors] = useState([]);

    const history = useHistory();

    useEffect(() => {
        // setUserToken(token);
        // setFormErrors(errors);

        if (token) {
            history.push(`/users/${formData.username}`);
        } else if (signinErrors.length !== 0) {
            setFormErrors(signinErrors);
        }
    }, [token, signinErrors]);

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
        console.log(token);
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
            {formErrors.length ? <Alert type='danger' messages={formErrors}/> : null}
            <button className="btn btn-primary mr-2">Save</button>
        </form>
    )
}

export default SigninForm;