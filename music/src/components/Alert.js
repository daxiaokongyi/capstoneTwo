import React from 'react';
import { useSelector } from 'react-redux';

const Alert = ({type="danger", messages=[]}) => {
    console.log(messages);

    return (
        <div className={`alert alert-${type}`} role="alert">
            {typeof messages === 'string' ? <p className="mb-0 small">{messages}</p> : messages.map(
                error => <p className="mb-0 small" key={error}>{error}</p>
            )}
        </div>
    )
}

export default Alert;