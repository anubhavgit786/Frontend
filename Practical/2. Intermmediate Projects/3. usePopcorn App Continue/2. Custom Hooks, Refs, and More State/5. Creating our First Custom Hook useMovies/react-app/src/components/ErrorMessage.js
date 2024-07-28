import React from 'react';

const ErrorMessage = ({ message })=>
{
    return (
    <p className="error">
        <span>💀</span>{message}<span>💀</span>
    </p>);
}

export default ErrorMessage;
