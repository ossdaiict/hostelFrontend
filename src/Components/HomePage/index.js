import React, { Component } from "react";

import NavBar from "../NavBar";
import "./style.scss";

class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <NavBar />
        <div className="home-page__title">
          <span className="home-page__title--primary">
            Hostel Managment Committee
          </span>
          <span className="home-page__title--secondary">
            Home, if you want to be.
          </span>
        </div>
      </div>
    );
  }
}

export default HomePage;
