import React, { Component } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";

import AddSnail from "../SnailMail/AddSnail";
import SnailMail from "../SnailMail";

class Dashboard extends Component {
  render() {
    const { url, path } = this.props.match;
    return (
      <div className="policy-page">
        <div className="side-navbar">
          <NavLink to={`${url}/add-snail`} className="side-navbar__item">
            Add Snail
          </NavLink>
          <NavLink to={`${url}/snailmail`} className="side-navbar__item">
            Snail Mail
          </NavLink>
        </div>
        <div className="policies">
          <Switch>
            <Route path={`${path}/add-snail`}>
              <AddSnail />
            </Route>
            <Route path={`${path}/snailmail`}>
              <SnailMail isAdmin={true} />
            </Route>

            {/* <Route path={`${path}/computer`}>
              <PolicyPage page="./Rules2.md" />
            </Route>
            <Route path={`${path}/cooler`}>
              <PolicyPage page="./Rules3.md" />
            </Route>
            <Route path={`${path}/snailmail`}>
              <PolicyPage page="./Procedures.md" />
            </Route> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
