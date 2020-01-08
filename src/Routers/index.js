import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import HomePage from "../Components/HomePage";
import NavBar from "../Components/NavBar";
import Dashboard from "../Components/Dashboard";
import Policies from "../Components/Policies";
import SnailMail from "../Components/SnailMail";
import Login from "../Components/Auth/Login";
import SignUp from "../Components/Auth/SignUp";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import Complaint from "../Components/Complient/AddComplaint";
import NotFoundPage from "../Components/NotFound";
import ResetPasswordLink from "../Components/Auth/ForgotPassword/ResetPassword";

import PrivateRoute from "../Utils/PrivateRouter";

import "./style.scss";

const RouterPage = () => {
  // const { path, url } = useRouteMatch();
  // console.log(path, url);
  return (
    <div className="main-page">
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        {/* <Route path="/dashboard">
          <Dashboard />
        </Route> */}
        <Route path="/policies">
          <Policies />
        </Route>
        <Route path="/snailmail">
          <SnailMail isAdmin={false} styled={{ overflowY: "auto" }} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <SignUp />
        </Route>
        {/* <Route path="/complaint">
          <Complaint />
        </Route> */}
        <PrivateRoute path="/complaint">
          <Complaint />
        </PrivateRoute>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/reset-password/:token">
          <ResetPasswordLink />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(RouterPage);
