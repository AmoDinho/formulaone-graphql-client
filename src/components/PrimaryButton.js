import React from 'react';
import '../styles/PrimaryButton.css';

const PrimaryButton = ({
    className = "",
    onClick,
    text,
    disabled = false,
    login 
}) => (
    <button 
    className={`primary  ${className}`} 
    onClick={onClick}
    disabled={disabled}
    >
        { text}
        {login ? 'Login' : 'Sign Up'}
       

    </button>
);

export default PrimaryButton;