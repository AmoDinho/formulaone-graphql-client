import React, {Component} from 'react';
import {emojis} from '../constants';
import '../styles/Circuit.css';
import img from '../1f1eb-1f1f7.png';


function lookUpURL(country, prop){
    console.log(country)
    let nation = emojis.find((x) => x.country === country)
    console.log(nation)
    return nation ? nation.hasOwnProperty(prop) ? nation[prop] : 'no such prop' : 'no such country'
    
}



 const Circuit = ({circuit}) => {
    
     return (
    
            <div className='circuit'>

            <div className='circuit_hero'>
            <img className='circuit_thumbnail' src={circuit.trackImage} alt='Circuits country'/>
            </div>
            
            <div className='circuit_details'>
            <p className='circuit_details_name'>{circuit.name}</p>
          
           
             <img src={lookUpURL(circuit.country, 'url')} className='circuit_details_emoji'  alt="ha"/>

            </div>
            
            </div>
        )

    
    
}

export default Circuit