import React, {Component} from 'react';
import {Link} from 'react-router-dom';


const Create = () => {
    return(
        <div>
         <h1>What would you like create to create? </h1>
          <Link to="/create-driver">Driver</Link>
          <Link to="/create-circuit">Circuit</Link>
        </div>
    )
}

export default Create;