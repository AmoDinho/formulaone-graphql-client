import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
        <nav className="menu bb  red">
        <button aria-expanded="false"  onClick={this.toggleNav} aria-controls="menu-list">
          <span className="open">☰</span>
          <span className="close">×</span>
          Menu
        </button>
        <div className="flex flex-fixed white">

        <div className="fw7 mr1 white"><h1>Forumla One</h1></div>
        <ul id="menu-list">
          <li>
          <Link to="/" 
          className="ml5  grow dtc no-underline black">
           <h3>New</h3>
           </Link>
          </li>

          <li>
          <Link to="/top" className="ml3 grow dtc no-underline black">
           <h3>Top</h3>
           </Link>          
           </li>

          <li>
          <Link to="/search" className="mt2 grow  dtc no-underline black">
           <h3>Search</h3>
           </Link>
          </li>

          <li>
          <Link to="/Circuits" className="mt2 grow  dtc no-underline black">
           <h3>Circuits</h3>
           </Link>          
           </li>

          <li>
          <Link to="/theatre" className="mt2 grow  dtc no-underline black">
           <h3>Theatre</h3>
           </Link>          
           </li>

           <li>
           {authToken &&(
               <div className="flex">
               <Link to="/create" className="ml3 grow mt2 no-underline white">
               <h3>Submit</h3>
               </Link>
               </div>
           )}
           </li>

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
                 <li>
                <Link to="/login" className="mr4 grow mt2 no-underline white">
               <h3>Login</h3>
               </Link>
               </li>
             )}
        </ul>
        
          </div>


         <div className="flex flex-fixed">
            
           </div>
      </nav>
       )
   }
}

export default withRouter(Header);