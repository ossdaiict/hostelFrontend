import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Loader() {
  return (
    <div>
      <Loader
        type="Bars"
        color="#252839"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
}

export default Loader;
