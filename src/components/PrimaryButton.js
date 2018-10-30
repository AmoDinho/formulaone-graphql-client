import React from 'react';
import '../styles/PrimaryButton.css';

const PrimaryButton = ({
    className = "",
    onClick,
    text,
    disabled = false,
    login 
}) => {
    
if(login){
   return (
        <button 
        className={`primary  ${className}`} 
        onClick={onClick}
        disabled={disabled}
        >
            { text}
            {login ? 'Login' : 'Sign Up'}
           
    
        </button>
    )

} else{
 return   (
        <button 
        className={`primary  ${className}`} 
        onClick={onClick}
        disabled={disabled}
        >
            { text}
            
           
    
        </button>
    )
}

}
;

export default PrimaryButton;