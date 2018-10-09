import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import DriverList from './DriverList';
import CreateDriver from './CreateDriver';
import Header from './Header';
import Search from './Search';
import Login from './Login';
import '../styles/App.css';

class App extends Component {
  render() {
    return(
      <div >
       <Header/>
       <div className="ph3 pv1 background-gray">
       <Switch>
       <Route exact path="/" render={() => <Redirect to="/new/1"/>} />
       <Route exact path="/create" component={CreateDriver}/>
         <Route exact path="/login" component={Login}/>
         <Route exact path="/search" component={Search}/>
         <Route exact path="/top" component={DriverList}/>
         <Route exact path="/new/:page" component={DriverList}/>
       </Switch>
       </div>
      </div>
    )
  }
}

export default App;
