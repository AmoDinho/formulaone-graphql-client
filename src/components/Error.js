import React from "react";
import '../styles/Error.css';

const Error = ()=> {
    const imgURL = "https://s3.reutersmedia.net/resources/r/?m=02&d=20180830&t=2&i=1299025839&r=LYNXNPEE7T1BM&w=1280"
   
    return(
        <div className="error__container">
            <h3>Our API is in the same state as this F1 car at the moment.</h3>
            <img className="error__image" src={imgURL}/>
        </div>
    )
}

export default Error;