import React from "react";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const LoadScreen = () => {
  const { loading } = useSelector((state) => state.loadReducer);
  const loadingScreen = (
    <div className="load-screen">
      <ClipLoader color={"#1dace3"} loading={true} size={150} />
    </div>
  );

  return <div>{loading.length > 0 ? loadingScreen : null}</div>;
};

export default LoadScreen;
