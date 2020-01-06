import React from "react";
import { NavLink } from "react-router-dom";
import { Accordion, AccordionItem } from "react-sanfona";
import Navigation from "../../../assets/downNavigation.svg";

import "./style.scss";

const SideDrawer = props => {
  const PolicyTitle = (
    <div className="accordion__title">
      <span className="accordion__title--text">Policies</span>
      <img
        src={Navigation}
        alt="Navigation"
        className="accordion__title--logo"
      />
    </div>
  );

  const Dashboard = (
    <div className="accordion__title">
      <span className="accordion__title--text">Dashboard</span>
      <img
        src={Navigation}
        alt="Navigation"
        className="accordion__title--logo"
      />
    </div>
  );

  return (
    <div
      className={!props.isSideDrawerOpen ? "side-drawer" : "side-drawer open"}
    >
      <ul className="side-drawer__items">
        <Accordion className="accordion">
          <li className="side-drawer__link">
            <NavLink to="/" className="side-drawer__item">
              Home
            </NavLink>
          </li>
          <AccordionItem
            title={Dashboard}
            className="accordion__items"
            expandedClassName="rotate"
          >
            <li className="accordion__link">
              <NavLink to="/dashboard/complaints" className="accordion__item">
                Complaints
              </NavLink>
            </li>
          </AccordionItem>
          <AccordionItem
            title={PolicyTitle}
            className="accordion__items"
            expandedClassName="rotate"
          >
            <li className="accordion__link">
              <NavLink to="/policies/rules" className="accordion__item">
                Rules & Regulation
              </NavLink>
            </li>
            <li className="accordion__link">
              <NavLink to="/policies/computer" className="accordion__item">
                Compute Policy
              </NavLink>
            </li>
            <li className="accordion__link">
              <NavLink to="/policies/cooler" className="accordion__item">
                Air Cooler Policy
              </NavLink>
            </li>
            <li className="accordion__link">
              <NavLink to="/policies/snailmail" className="accordion__item">
                Snail Mail Policy
              </NavLink>
            </li>
          </AccordionItem>
          <li className="side-drawer__link">
            <NavLink to="/snailmail" className="side-drawer__item">
              Snail Mail
            </NavLink>
          </li>
          <li className="side-drawer__link">
            <NavLink to="/complaint" className="side-drawer__item">
              Complaint
            </NavLink>
          </li>
          <li className="side-drawer__link">
            <a href="https://github.com/ossdaiict/hostel-frontend" className="side-drawer__item">
              Contribute!
            </a>
          </li>
        </Accordion>
      </ul>
    </div>
  );
};

export default SideDrawer;
