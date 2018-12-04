import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Create.css';


const Create = () => {

    const driverImg = "https://www.formula1.com/content/dam/fom-website/sutton/2018/Abu%20Dhabi/Sunday/dcd1825no1152.jpg.transform/9col/image.jpg";
    const circuitImg = "https://images.unsplash.com/photo-1535402906510-14d8e3e8eed3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=86eb5e5a9332dfa1ac905e10eed6c2c8&auto=format&fit=crop&w=1267&q=80"
    return(
        <div>
         <h1>What would you like  to create? </h1>
         <div className="create_container">
        
         <Link className="Link grow" to="/create-driver">

           <div className="create_container_card">
           <h2>Driver</h2>
             <img className="create_container_card_img" src={driverImg} alt="driver"/>
           </div>

          </Link>
          <Link className="Link grow" to="/create-circuit">

          <div className="create_container_card">
          <h2>Circuit</h2>
            <img className="create_container_card_img" src={circuitImg} alt="circuit"/>
          </div>
          </Link>
         </div>
        </div>
    )
}

export default Create;