import React from "react";

const SearchBar = ({ organization }) => {
  return (
    <form>
      <div className="form-group m-0 row no-gutters flex-nowrap p-0">
        <div className="col-auto" style={{ zIndex: 2 }}>
          <button
            disabled
            className="btn h-100 text-primary text-right border-0 mr-n5 ml-2 rounded-pill"
            style={{ zIndex: 3 }}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="col col-sm-12">
          <input
            type="search"
            className="form-control pl-5 rounded-pill"
            placeholder="Search..."
            style={{ zIndex: 1 }}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
