import React from "react";
import '../styles/NotFound.css'

const url = 'https://www.formula1.com/content/dam/fom-website/manual/Misc/HAM_championship_celebrations/SUT_Mexican_Grand__1696784.jpg.transform/9col/image.jpg';

const imgStyles = {
    width:'1500px',
    height:'500px',
    borderRadius: '5px'
}



export default () => 
 <div className="not_found">
     <h1 style={{}}>Congrats you've found nothing!
         <span aria-label="emoji" role="img">
        
         </span>
    </h1>
     <img src={url} style={{imgStyles}}/>
 </div>