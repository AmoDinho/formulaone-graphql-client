import React from 'react';
import '../styles/PrimaryButton.css';

const PrimaryButton = ({
    className = "",
    onClick,
    text
}) => (
    <button className={`primary  ${className}`} onClick={onClick}>
        {text}
    </button>
);

export default PrimaryButton;