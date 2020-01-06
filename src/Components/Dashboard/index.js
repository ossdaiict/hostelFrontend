import React, { Component } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AddSnail from "../SnailMail/AddSnail";
import SnailMail from "../SnailMail";
import Complaint from "../Complient";
import ResolveComplaint from "../Complient/ResolveComplaint";
import NotFoundPage from "../NotFound";

class Dashboard extends Component {
  render() {
    const { url, path } = this.props.match;

    return (
      <div className="policy-page">
        {this.props.user.isSupervisor ? (
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
            <NavLink
              to={`${url}/resolve-complaints`}
              className="side-navbar__item"
            >
              Solved Com.
            </NavLink>
          </div>
        ) : (
          <div className="side-navbar">
            <NavLink to={`${url}/complaints`} className="side-navbar__item">
              Complaints
            </NavLink>
          </div>
        )}

        <div className="policies">
          <Switch>
            {this.props.user.isSupervisor && (
              <Route path={`${path}/add-snail`}>
                <AddSnail />
              </Route>
            )}
            {this.props.user.isSupervisor && (
              <Route path={`${path}/snailmail`}>
                <SnailMail isAdmin={true} />
              </Route>
            )}
            <Route path={`${path}/complaints`}>
              <Complaint />
            </Route>
            {this.props.user.isSupervisor && (
              <Route path={`${path}/resolve-complaints`}>
                <ResolveComplaint />
              </Route>
            )}
            <Route path={`${path}/*`}>
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(withRouter(Dashboard));
