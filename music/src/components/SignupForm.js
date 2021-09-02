import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Alert from './Alert';
import { useSelector } from 'react-redux';

const SignupForm = ({save}) => {
    const token = useSelector(st => st.users.token);
    const signupErrors = useSelector(st => st.users.signup_errors);

    // console.log(`token: ${token}, errors: ${errors}`);
    // console.log(`!token: ${!token}`);
    // console.log(`errors.length: ${errors.length}`);

    const INITIAL_SIGNUPDATA = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",   
        email: ""
    } 

    // Initialize and update the user info state
    const [formData, setFormData] = useState(INITIAL_SIGNUPDATA);
    const [formErrors, setFormErrors] = useState([]);
    const [userToken, setUserToken] = useState(token);
    const history = useHistory();

    useEffect(() => {
        // setUserToken(token);
        // setFormErrors(errors);

        console.log(token);
        console.log(signupErrors);

        if (token) {
            history.push(`/users/${formData.username}`);
        } else if (signupErrors.length !== 0) {
            setFormErrors(signupErrors);
        }
    }, [signupErrors, token]);

    const handleSubmit = evt => {
        evt.preventDefault();
        console.log(formData);
        save(formData);
        // check if sign up has no errors
        // console.log(formErrors);
        // console.log(`token: ${token}, errors: ${errors}`);
        // console.log(`!token: ${!token}`);
        // console.log(`errors.length: ${errors.length}`);

        // if (token && errors.length === 0) {
        //     history.push(`/users/${formData.username}`);    
        // }

        // if (formErrors.length === 0) {
        //     history.push(`/users/${formData.username}`);    
        //     setFormErrors([]);
        // } else {
        //     // console.log(users);
        //     console.log(users.errors);
        //     setFormErrors(users.errors);
        //     // console.log(formErrors);
        // }
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    return(
        <form className="mb-4" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="signup-username">User Name: </label>
                <input
                    onChange={handleChange}
                    id="signup-username"
                    name="username"
                    type="text"
                    className="form-control"
                    value={formData.username}
                />
            </div>
            <div className="form-group">
                <label htmlFor="signup-firstname">First Name: </label>
                <input 
                    onChange={handleChange}
                    id="signup-firstname"
                    name="firstName"
                    type="text"
                    className="form-control"
                    value={formData.firstName}
                />                            
            </div>
            <div className="form-group">
                <label htmlFor="signup-lastname">Last Name: </label>
                <input 
                    onChange={handleChange}
                    id="signup-lastname"
                    name="lastName"
                    type="text"
                    className="form-control"
                    value={formData.lastName}
                />                                       
            </div>
            <div className="form-group">
                <label htmlFor="signup-email">Email: </label>
                <input 
                    onChange={handleChange}
                    id="signup-email"
                    name="email"
                    type="text"
                    className="form-control"
                    value={formData.email}
                />                         
            </div>
            <div className="form-group">
                <label htmlFor="signup-password">Password: </label>
                <input 
                    onChange={handleChange}
                    id="signup-password"
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

export default SignupForm;