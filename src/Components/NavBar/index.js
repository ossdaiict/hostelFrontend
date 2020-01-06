import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../Store/Actions/authAction";
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

  handleSideDrawerClose = () => {
    this.setState({
      isSideDrawerOpen: false
    });
  };

  handleLogOut = () => {
    this.props.logoutUser();
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
      backDrop = <BackDrop handleSideDrawer={this.handleSideDrawerClose} />;
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
            <li className="nav-bar__link">
              <NavLink to="/complaint" className="nav-bar__item">
                Complaints
              </NavLink>
            </li>
          </ul>
          <SideDrawer
            isSideDrawerOpen={this.state.isSideDrawerOpen}
            handleSideDrawerClose={this.handleSideDrawerClose}
          />
          {backDrop}

          {!this.props.isAuthenticated ? (
            <NavLink to="/login" className="user-navbar">
              <div className="user-navbar__login">
                <span className="user-navbar__login--text">Login</span>
              </div>
            </NavLink>
          ) : (
            <div
              className="user-navbar"
              onClick={this.handleLogOut}
              style={{ cursor: "pointer" }}
            >
              <div className="user-navbar__login">
                <span className="user-navbar__login--text">LogOut</span>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { logoutUser })(NavBar));
