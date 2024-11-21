import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className=" w-full h-full flex-center">
      <div className="loader">
        <span className="loader-text  ">loading...</span>
        <span className="load"></span>
      </div>
    </div>
  );
};

export default Loader;
