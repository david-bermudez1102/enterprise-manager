import React from "react";

const icons = [
  { type: "Admin", className: "fas fa-user-cog" },
  { type: "Manager", className: "fas fa-user-shield" },
  { type: "Employee", className: "fas fa-user" }
];
const Account = ({ account }) => {
  const icon = icons.find(icon => icon.type === account.type);
  return (
    <div
      className="row border-0 shadow-sm rounded list-group-item py-md-5 py-sm-2 mb-1 d-flex align-items-center justify-content-between display-4"
      style={{ fontSize: "20px" }}>
      <span className="order-sm-2 order-md-1 py-3 col-sm-12 col-xl-7 col-lg-8 col-md-8">
        <i className={`${icon.className} text-primary`} title="Employee"></i>{" "}
        {account.name}
      </span>
      <span
        className="order-sm-1 order-md-2 py-3 col-sm-12 col-xl-5 col-lg-4 col-md-4 d-flex justify-content-between text-primary"
        style={{ fontSize: "18px" }}>
        <i className="fas fa-envelope"></i>
        <i className="fas fa-power-off"></i>
        <i className="fas fa-unlock"></i>
        <i className="fas fa-pen"></i>
        <i className="fas fa-user-times text-danger"></i>
      </span>
    </div>
  );
};

export default Account;
