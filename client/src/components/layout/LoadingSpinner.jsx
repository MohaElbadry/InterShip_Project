import React from "react";
import { Hourglass } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
    </div>
  );
};

export default LoadingSpinner;
