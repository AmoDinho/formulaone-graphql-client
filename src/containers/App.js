import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import DriverList from './DriverList';
import CreateDriver from './CreateDriver';
import Header from '../components/Header';
import NotFound from './NotFound';
import DriverInfo from './DriverInfo';
import Search from './Search';
import Login from './Login';
import Settings from './Settings';
import '../styles/App.css';
import RequestReset from './RequestReset';
import ResetPassword from './ResetPassword';
import DeactivateAcc from './DeactivateAcc';


class App extends Component {
  render() {
    return(
      <div >
       <Header/>
       <div className="ph3 pv1 background-gray center">
       <Switch>
       <Route exact path="/" render={() => <Redirect to="/new/1"/>} />
       <Route exact path="/create" component={CreateDriver}/>
         <Route exact path="/login" component={Login}/>
         <Route exact path="/search" component={Search}/>
         <Route exact path="/top" component={DriverList}/>
         <Route exact path="/driver/:id" component={DriverInfo}/>
         <Route exact path="/new/:page" component={DriverList}/>
         <Route exact path="/requestReset" component={RequestReset}/>
         <Route exact path="/resetPassword/:resetURL" component={ResetPassword}/>
         <Route exact path="/settings" component={Settings}/>
         <Route exact path="/deactivate" component={DeactivateAcc}/>
         <Route component={NotFound}/>
       </Switch>
       </div>
      </div>
    )
  }
}

export default App;
