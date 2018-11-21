import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as Icon from 'react-feather';
import {withRouter} from 'react-router';
import {AUTH_TOKEN} from '../constants'
import '../styles/Header.css';

class Header extends Component{

     toggleNav = ({ target })  => {
        const navButton = document.querySelector('button[aria-expanded]');
        const expanded = target.getAttribute('aria-expanded') === 'true' || false;
        navButton.setAttribute('aria-expanded', !expanded);
      }

   render(){
    const authToken = localStorage.getItem(AUTH_TOKEN)

       return (
        <nav className="menu bb red">
        
        <div className="flex flex-fixed white">

        <div className="fw7 mr1 ml4 white"> <Link className="no-underline white" to="/"><h1>FanBoost</h1></Link>
        <button aria-expanded="false"  onClick={this.toggleNav} aria-controls="menu-list">
          <span className="open">☰</span>
          <span className="close">×</span>
          Menu
        </button>
        </div>
        <ul id="menu-list">
          <li>
          <Link to="/" 
          className="ml5  grow dtc no-underline black">
           <h3>New</h3>
           </Link>
          </li>

          <li>
          <Link to="/top" className=" grow dtc no-underline black">
           <h3>Top</h3>
           </Link>          
           </li>

                  <li>
          <Link to="/circuits" className=" ml7 grow  dtc no-underline black">
           <h3>Circuits</h3>
           </Link>          
           </li>

          <li>
          <Link to="/theatre" className=" grow  dtc no-underline black">
           <h3>Theatre</h3>
           </Link>          
           </li>

           <li>
             
           {authToken &&(
              
               <Link to="/create" className="ml3 grow dtc no-underline black">
               <h3>Create</h3>
               </Link>
               
           )}
           </li>

           <li className="menu_right">
          
           {authToken ? (
               
               <li>
                   <h3 className="grow pointer">
          <Icon.User className="pointer "/> 
          </h3>
               
               <ul className="dropdown">
                   <Link to="/deactivate" className="no-underline black">
                     <h3>Deactivate</h3>
                     </Link>
                   <div 
                 className="ml1 mt2 grow pointer black"
                 onClick={() => {
                     localStorage.removeItem(AUTH_TOKEN)
                     this.props.history.push(`/`)
                 }}>
                 <h3>Logout</h3>
                 </div>
                 


               </ul>
               </li>
                 
             ): (
             <Link to="/login" className=" login ml7 grow dtc grow no-underline white">
             <h3>Login</h3>
             </Link>
                
             )}
                
               </li>
         
        </ul>
        
          </div>


         
      </nav>
       )
   }
}

export default withRouter(Header);