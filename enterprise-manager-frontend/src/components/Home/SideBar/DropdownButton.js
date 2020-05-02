import React from "react";

const DropdownButton = ({ link, minimized, toggleDropDown }) => {
  const { btnClassName } = {
    btnClassName: "btn btn-transparent py-0 text-white h-100 shadow-none",
  };
  return link.dropdown && !minimized ? (
    link.status === "open" ? (
      <div className="h-100">
        <button
          className={btnClassName}
          onClick={e => toggleDropDown(e, link.id)}>
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
    ) : (
      <div className="h-100">
        <button
          className={btnClassName}
          onClick={e => toggleDropDown(e, link.id)}>
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
    )
  ) : null;
};

export default DropdownButton;
