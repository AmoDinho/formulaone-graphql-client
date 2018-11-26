import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import DriverList from './DriverList';
import CreateDriver from './CreateDriver';
import Header from '../components/Header';
import Create from '../components/Create';
import NotFound from './NotFound';
import DriverInfo from './DriverInfo';
import Login from './Login';
import '../styles/App.css';
import RequestReset from './RequestReset';
import ResetPassword from './ResetPassword';
import DeactivateAcc from './DeactivateAcc';
import CircuitList from './CircuitList';
import CircuitInfo from './CircuitInfo';
import CreateCircuit from './CreateCircuit';


class App extends Component {
  render() {
    return(
      <div >
       <Header/>
       <div className=" background-gray  app ">
       <Switch>
       <Route exact path="/" render={() => <Redirect to="/new/1"/>} />
       <Route exact path="/create-driver" component={CreateDriver}/>
         <Route exact path="/login" component={Login}/>
         <Route exact path="/top" component={DriverList}/>
         <Route exact path="/driver/:id" component={DriverInfo}/>
         <Route exact path="/new/:page" component={DriverList}/>
         <Route exact path="/requestReset" component={RequestReset}/>
         <Route exact path="/resetPassword/:resetURL" component={ResetPassword}/>
         <Route exact path="/deactivate" component={DeactivateAcc}/>
         <Route exact path="/circuits" component={CircuitList}/>
         <Route exact path="/circuits/:page" component={CircuitList}/>
         <Route exact path="/circuit/:id" component={CircuitInfo}/>
         <Route exact path="/create" component={Create}/>
         <Route exact path="/create-circuit" component={CreateCircuit}/>

         <Route component={NotFound}/>
       </Switch>
       </div>
      </div>
    )
  }
}

export default App;
