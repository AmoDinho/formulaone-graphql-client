import React from 'react';
import '../styles/SecondaryButton.css';

const SecondaryButton = ({
    className = "",
    onClick,
    text
}) => (
    <button className={`secondary  ${className}`} onClick={onClick}>
        {text}
    </button>
);

export default SecondaryButton;