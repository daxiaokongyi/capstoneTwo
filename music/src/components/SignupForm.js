import React, {useState} from 'react';

const SignupForm = ({save, cancel}) => {
    const INITIAL_SIGNUPDATA = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",   
        email: ""
    } 

    // Initialize and update the user info state
    const [formData, setFormData] = useState(INITIAL_SIGNUPDATA);

    const handleSubmit = evt => {
        evt.preventDefault();
        console.log(formData);
        save(formData);
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
            <button className="btn btn-primary mr-2">Save</button>
            <button className="btn btn-secondary" onClick={cancel}>Cancel</button>
        </form>
    )
}

export default SignupForm;