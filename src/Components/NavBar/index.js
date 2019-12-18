import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import "./style.scss";

const NavBar = props => {
  console.log(props);
  return (
    <nav
      className={props.location.pathname === "/" ? "nav-bar" : "nav-bar white"}
    >
      <div className="container">
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
        <NavLink to="/login" className="user-navbar">
          <div className="user-navbar__login">
            <span className="user-navbar__login--text">Login</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
