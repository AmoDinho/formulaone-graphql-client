import React, {Component} from 'react';
import '../styles/Circuit.css';
import img from '../1f1eb-1f1f7.png';

 const Circuit = ({circuit}) => {
    
        return(
            <div className='circuit'>

            <div className='circuit_hero'>
            <img className='circuit_thumbnail' src={circuit.trackImage} alt='Circuits country'/>
            </div>
            <div className='circuit_details'>
            <p className='circuit_details_name'>{circuit.name}</p>
          
          
           <img src={img} className='circuit_details_emoji'  alt="ha"/>
            </div>
            
            </div>
        )
    
}

export default Circuit