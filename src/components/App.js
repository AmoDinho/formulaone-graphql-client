import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import DriverList from './DriverList';
import CreateDriver from './CreateDriver';
import Header from './Header';
import Login from './Login';
import '../styles/App.css';

class App extends Component {
  render() {
    return(
      <div className="center w85">
       <Header />
       <div className="ph3 pv1 background-gray">
       <Switch>
         <Route exact path="/" component={DriverList}/>
         <Route exact path="/create" component={CreateDriver}/>
         <Route exact path="/login" component={Login}/>

       </Switch>
       </div>
      </div>
    )
  }
}

export default App;
