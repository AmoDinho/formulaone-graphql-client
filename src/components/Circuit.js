import React, {Component} from 'react';

 const Circuit = ({circuit}) => {
  
        return(
            <div>
            <p>{circuit.name} - {circuit.country}</p>
            </div>
        )
    
}

export default Circuit