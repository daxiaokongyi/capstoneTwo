import React from 'react';

const Alert = ({type="danger", messages=[]}) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {typeof messages === 'string' ? <p className="mb-0 small">{messages}</p> : messages.map(
                error => <p className="mb-0 small" key={error}>{error}</p>
            )}
        </div>
    )
}

export default Alert;