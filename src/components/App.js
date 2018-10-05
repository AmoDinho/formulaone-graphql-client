import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import DriverList from '../containers/DriverList';
import CreateDriver from './CreateDriver';
import Driver from '../containers/Driver';
import Header from './Header';
import '../styles/App.css';

class App extends Component {
  render() {
    return(
      <div className="center w85">
       <Header />
       <div className="ph3 pv1 background-gray">
       <Switch>
         <Route exact path="/create" component={CreateDriver}/>
         <Route exact path="/" component={DriverList} />
        <Route exact path="/driver" component={Driver} />
        {/*
        
        <Route exact path="/drivers" component={Drivers}/>
                 <Route exact path="/" component={Drivers}/>

        */} 

       </Switch>
       </div>
      </div>
    )
  }
}

export default App;
