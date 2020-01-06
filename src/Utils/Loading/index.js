import React from "react";
import Loader from "react-loader-spinner";

const Loading = props => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >
      <Loader
        visible={props.display}
        type="Bars"
        color="#252839"
        height={100}
        width={100}
      />
    </div>
  );
};

export default Loading;
