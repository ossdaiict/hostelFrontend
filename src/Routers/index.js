import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "../Components/HomePage";
import NavBar from "../Components/NavBar";
import Dashboard from "../Components/Dashboard";
import Policies from "../Components/Policies";
import SnailMail from "../Components/SnailMail";

const RouterPage = () => {
  // const { path, url } = useRouteMatch();
  // console.log(path, url);
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/policies" exact>
          <Policies />
        </Route>
        <Route path="/snailmail" exact>
          <SnailMail />
        </Route>
      </Switch>
    </div>
  );
};

export default RouterPage;
