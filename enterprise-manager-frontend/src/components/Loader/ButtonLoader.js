import React from "react";
import HashLoader from "react-spinners/HashLoader";

const ButtonLoader = ({ loading, children }) => {
  return (
    <button
      className="btn btn-primary shadow"
      type="submit"
      disabled={loading ? true : false}>
      <div className="w-100 d-flex align-items-center flex-nowrap">
        {loading ? (
          <HashLoader loading={loading} color={"#fff"} size={24} />
        ) : (
          children
        )}
      </div>
    </button>
  );
};

export default ButtonLoader;
