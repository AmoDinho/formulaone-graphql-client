import React from "react";
import { Switch, Route } from "react-router-dom";
import DriverList from "../containers/DriverList";
import Driver from "../containers/Driver";

const Drivers = () => (
  <Switch>
    <Route exact path="/" component={DriverList} />
    <Route exact path="/driver/:id" component={Driver} />
  </Switch>
);

export default Drivers;