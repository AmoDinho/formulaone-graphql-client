import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {AUTH_TOKEN} from '../constants'
import Search from './Search';

class Header extends Component{
   render(){
    const authToken = localStorage.getItem(AUTH_TOKEN)

       return (
           <div className="flex pal justify-between nowrap red">
           <div className="flex flex-fixed white">
           <div className="fw7 mr1">Forumla One</div>
           <Link to="/" className="ml1 no-underline white">
           new
           </Link>
           <div className="ml1">|</div>
           <Link to="/search" className="ml1 no-underline black">
           Search
           </Link>
           {authToken &&(
               <div className="flex">
               <div className="ml1">|</div>
               <Link to="/create" className="ml1 no-underline white">
               submit
               </Link>
               </div>
           )}
           
           </div>
        
           <div className="flex flex-fixed">
             {authToken ? (
                 <div 
                 className="ml1 pointer red"
                 onClick={() => {
                     localStorage.removeItem(AUTH_TOKEN)
                     this.props.history.push(`/`)
                 }}>
                 logout
                 </div>
             ): (
                <Link to="/login" className="ml1 no-underline white">
               Login
               </Link>
             )}
           </div>
           </div>
       )
   }
}

export default withRouter(Header);