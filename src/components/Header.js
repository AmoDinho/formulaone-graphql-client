import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {AUTH_TOKEN} from '../constants'
import '../styles/Header.css';

class Header extends Component{
   render(){
    const authToken = localStorage.getItem(AUTH_TOKEN)

       return (
           <nav className="flex bb justify-between  red">
           <div className="flex flex-fixed white">
           <div className=" ml4 mr5"><h1>Formula One</h1></div>


        
         <Link to="/" className="ml5 mt2 grow dtc no-underline black">
           <h3>New</h3>
           </Link>
       
       
           <Link to="/top" className="ml3 grow mt2 no-underline black">
           <h3>Top</h3>
           </Link>
           <Link to="/search" className="mt2 grow  ml3 dtc no-underline black">
           <h3>Search</h3>
           </Link>
           <Link to="/Circuits" className="mt2 grow ml3 dtc no-underline black">
           <h3>Circuits</h3>
           </Link>
           <Link to="/theatre" className="mt2 grow ml3 dtc no-underline black">
           <h3>Theatre</h3>
           </Link>
           {authToken &&(
               <div className="flex">
               <Link to="/create" className="ml3 grow mt2 no-underline white">
               <h3>Submit</h3>
               </Link>
               </div>
           )}
         </div>
         

    
          

           
          
        
           <div className="flex flex-fixed">
             {authToken ? (
                 <div 
                 className="ml1 mt2 grow pointer red"
                 onClick={() => {
                     localStorage.removeItem(AUTH_TOKEN)
                     this.props.history.push(`/`)
                 }}>
                 <h3>Logout</h3>
                 </div>
             ): (
                <Link to="/login" className="mr4 grow mt2 no-underline white">
               <h3>Login</h3>
               </Link>
             )}
           </div>
           </nav>
       )
   }
}

export default withRouter(Header);