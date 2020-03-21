import React from "react";
import Avatar from "../Home/SideBar/Avatar";

const capitalize = require("capitalize");

const icons = [
  { type: "Admin", className: "fas fa-user-cog" },
  { type: "Manager", className: "fas fa-user-shield" },
  { type: "Employee", className: "fas fa-user" }
];

const Account = ({ account }) => {
  const icon = icons.find(icon => icon.type === account.type);
  return (
    <div className={classNames.listItem} style={{ fontSize: "22px", cursor: "pointer" }}>
      <span className={classNames.firstCol}>
        <Avatar currentUser={account} style={{ zIndex: 1 }} size={50} />
        <div
          id="roleIconWrapper"
          title={icon.type}
          className={classNames.roleIconWrapper}
          style={{
            zIndex: 2,
            width: "30px",
            height: "30px",
            fontSize: "14px",
            background: "rgba(0,0,0,0.6)",
            marginTop: "30px"
          }}>
          <i className={icon.className}></i>
        </div>
        {capitalize.words(account.name)}
      </span>
      <span className={classNames.secondCol} style={{ fontSize: "18px" }}>
        <i className="fas fa-envelope"></i>
        <i className="fas fa-power-off"></i>
        <i className="fas fa-unlock"></i>
        <i className="fas fa-pen"></i>
        <i className="fas fa-user-times text-danger"></i>
      </span>
    </div>
  );
};

const classNames = {
  listItem:
    "row border-0 shadow-sm rounded list-group-item py-md-3 py-sm-2 mb-1 d-flex align-items-center justify-content-between display-4 list-group-item-action px-4",
  firstCol:
    "d-flex order-sm-2 order-md-1 py-3 col-sm-12 col-xl-7 col-lg-8 col-md-8 align-items-center",
  secondCol:
    "order-sm-1 order-md-2 py-3 col-sm-12 col-xl-5 col-lg-4 col-md-4 d-flex justify-content-between text-primary",
  roleIconWrapper:
    "rounded-circle shadow text-light ml-n4 d-flex align-items-center justify-content-center"
};

export default Account;
