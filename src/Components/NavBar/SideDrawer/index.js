import React from "react";
import { NavLink } from "react-router-dom";
import { Accordion, AccordionItem } from "react-sanfona";
import mySvg from "../../../assets/downNavigation.svg";

import "./style.scss";

const SideDrawer = () => {
  const PolicyTitle = (
    <div className="accordion__title">
      <span className="accordion__title--text">Policies</span>
      <img src={mySvg} alt="Navigation" className="accordion__title--logo" />
    </div>
  );

  return (
    <div className="side-drawer">
      <ul className="side-drawer__items">
        <Accordion className="accordion">
          <li className="side-drawer__link">
            <NavLink to="/" className="side-drawer__item">
              Home
            </NavLink>
          </li>
          <li className="side-drawer__link">
            <NavLink to="/dashboard" className="side-drawer__item">
              Dashboard
            </NavLink>
          </li>
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
        </Accordion>
      </ul>
    </div>
  );
};

export default SideDrawer;
