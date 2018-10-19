import React from 'react';
import '../styles/SecondaryButton.css';

const SecondaryButton = ({
    className = "",
    onClick,
    text,
    disabled = false,
    login
}) => (
    <button 
    className={`secondary  ${className}`} 
    onClick={onClick}
    disabled={disabled}

    >
        {text}
        {login
                   ? 'Need to sign up?'
                   : 'Got an account?'             
             }
    </button>
);

export default SecondaryButton;