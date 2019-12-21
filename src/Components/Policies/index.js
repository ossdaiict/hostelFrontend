import React, { Component } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";

import PolicyPage from "./PolicyFiles";

import "./style.scss";

class Policies extends Component {
  render() {
    const { url, path } = this.props.match;
    return (
      <div className="policy-page">
        <div className="side-navbar">
          <NavLink to={`${url}/rules`} className="side-navbar__item">
            Rules & Regulation
          </NavLink>
          <NavLink to={`${url}/computer`} className="side-navbar__item">
            Computer Policy
          </NavLink>
          <NavLink to={`${url}/cooler`} className="side-navbar__item">
            Air Cooler Policy
          </NavLink>
          <NavLink to={`${url}/snailmail`} className="side-navbar__item">
            Snail Mail Policy
          </NavLink>
        </div>
        <div className="policies">
          <Switch>
            <Route path={`${path}/rules`}>
              <PolicyPage page="./Rules.md" />
            </Route>
            <Route path={`${path}/computer`}>
              <PolicyPage page="./Rules2.md" />
            </Route>
            <Route path={`${path}/cooler`}>
              <PolicyPage page="./Rules3.md" />
            </Route>
            <Route path={`${path}/snailmail`}>
              <PolicyPage page="./Procedures.md" />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(Policies);
