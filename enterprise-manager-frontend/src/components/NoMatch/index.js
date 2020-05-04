import React from "react";
import { Link, useHistory } from "react-router-dom";

const NoMatch = () => {
  const history = useHistory();

  const { container, section, btn } = {
    container:
      "position-absolute pb-5 pt-4 top-0 min-h-100 w-100 bg-light d-flex align-items-center justify-content-center flex-wrap",
    section: "w-100 text-center",
    btn: "btn btn-info btn-lg rounded-pill shadow-sm mx-3",
  };
  return (
    <div className={container} style={{ zIndex: 3, left: 0, top: 0 }}>
      <span className={section}>
        <h1 className="display-1 text-dark mb-0">Oops!</h1>
      </span>
      <span className={section}>
        <h2 className="display-4 text-muted">404 - Page Not found</h2>
      </span>
      <span className={section}>
        <h4 className="text-muted">
          We're sorry. It appears the page you were looking for doesn't exist or
          has been removed
        </h4>
      </span>
      <span className={section}>
        {history.length > 1 ? (
          <button className={btn} onClick={() => history.goBack()}>
            Go Back
          </button>
        ) : null}
        <Link className={btn} to={"/"}>
          Go Home
        </Link>
      </span>
    </div>
  );
};

export default NoMatch;
