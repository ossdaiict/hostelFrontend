import React from "react";
import "./style.scss";

const BackDrop = props => {
  return <div className="backdrop" onClick={props.handleSideDrawer} />;
};

export default BackDrop;
