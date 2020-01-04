import React, { Component } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AddSnail from "../SnailMail/AddSnail";
import SnailMail from "../SnailMail";
import Complaint from "../Complient";

class Dashboard extends Component {
  render() {
    const { url, path } = this.props.match;
    // console.log(this.props.isLoading);
    return (
      <div className="policy-page">
        <div className="side-navbar">
          <NavLink to={`${url}/add-snail`} className="side-navbar__item">
            Add Snail
          </NavLink>
          <NavLink to={`${url}/snailmail`} className="side-navbar__item">
            Snail Mail
          </NavLink>
          <NavLink to={`${url}/complaints`} className="side-navbar__item">
            Complaints
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
            <Route path={`${path}/complaints`}>
              <Complaint />
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

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(withRouter(Dashboard));
