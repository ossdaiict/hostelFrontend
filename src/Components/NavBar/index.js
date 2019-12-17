import React from "react";
import "./style.scss";

const NavBar = props => {
  return (
    <nav className="nav-bar">
      <div className="container">
        {/* <div className="nav-bar__logo">
          <a href="/" className="nav-bar__logo--link">
            HMC
          </a>
        </div> */}
        <ul className="nav-bar__items">
          <li className="nav-bar__link">
            <a href="/" className="nav-bar__item">
              Home
            </a>
          </li>
          <li className="nav-bar__link">
            <a href="/dashboard" className="nav-bar__item">
              Dashboard
            </a>
          </li>
          <li className="nav-bar__link">
            <a href="policies" className="nav-bar__item">
              Policies
            </a>
          </li>
          <li className="nav-bar__link">
            <a href="snail-mail" className="nav-bar__item">
              Snail Mail
            </a>
          </li>
        </ul>
        <div>Login</div>
      </div>
    </nav>
  );
};

export default NavBar;
