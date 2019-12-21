import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import "./style.scss";
import BackDrop from "./BackDrop";
import SideDrawer from "./SideDrawer";

class NavBar extends React.Component {
  state = {
    isSideDrawerOpen: false
  };

  handleSideDrawer = () => {
    this.setState(prevProps => {
      return {
        isSideDrawerOpen: !prevProps.isSideDrawerOpen
      };
    });
  };

  render() {
    const Bar = (
      <div className="bar" onClick={this.handleSideDrawer}>
        <div className="bar__line"></div>
        <div className="bar__line"></div>
        <div className="bar__line"></div>
      </div>
    );
    let backDrop;
    if (this.state.isSideDrawerOpen) {
      backDrop = <BackDrop handleSideDrawer={this.handleSideDrawer} />;
    }
    return (
      <nav
        className={
          this.props.location.pathname === "/" ? "nav-bar" : "nav-bar white"
        }
      >
        <div className="container">
          {Bar}
          <ul className="nav-bar__items">
            <li className="nav-bar__link">
              <NavLink to="/" exact className="nav-bar__item">
                Home
              </NavLink>
            </li>
            <li className="nav-bar__link">
              <NavLink to="/dashboard" className="nav-bar__item">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-bar__link">
              <NavLink to="/policies" className="nav-bar__item">
                Policies
              </NavLink>
            </li>
            <li className="nav-bar__link">
              <NavLink to="/snailmail" className="nav-bar__item">
                Snail Mail
              </NavLink>
            </li>
          </ul>
          <SideDrawer isSideDrawerOpen={this.state.isSideDrawerOpen} />
          {backDrop}
          <NavLink to="/login" className="user-navbar">
            <div className="user-navbar__login">
              <span className="user-navbar__login--text">Login</span>
            </div>
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
