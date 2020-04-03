import React from "react";
import Avatar from "../Home/SideBar/Avatar";
import IconWrapper from "../Icons/IconWrapper";
import cuid from "cuid";
import { Link } from "react-router-dom";

const capitalize = require("capitalize");

const roleIcons = [
  { type: "Admin", className: "fas fa-user-cog" },
  { type: "Manager", className: "fas fa-user-shield" },
  { type: "Employee", className: "fas fa-user" }
];

const menuIcons = [
  { title: "", className: "fas fa-envelope" },
  { title: "", className: "fas fa-power-off" },
  { title: "", className: "fas fa-unlock" },
  { title: "", className: "fas fa-pen" },
  { title: "", className: "fas fa-user-times", action: "delete" }
];

const Account = ({ account }) => {
  const roleIcon = roleIcons.find(icon => icon.type === account.type);
  return (
    <div
      className={classNames.listItem}
      style={{ fontSize: "22px", cursor: "pointer" }}>
      <span className={classNames.firstCol}>
        <Avatar currentUser={account} style={{ zIndex: 1 }} size={50} />
        <IconWrapper
          title={roleIcon.type}
          style={{
            zIndex: 2,
            fontSize: "14px",
            marginTop: "30px",
            marginLeft: "-24px"
          }}
          size="30px">
          <i className={roleIcon.className}></i>
        </IconWrapper>
        {capitalize.words(account.name)}
      </span>
      <span className={classNames.secondCol} style={{ fontSize: "18px" }}>
        {menuIcons.map(icon => (
          <IconWrapper size="30px" key={cuid()}>
            <Link
              to={`/accounts/${account.id}/${icon.action}`}
              className="text-light">
              <i {...icon}></i>
            </Link>
          </IconWrapper>
        ))}
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
    "order-sm-1 order-md-2 py-3 col-sm-12 col-xl-5 col-lg-4 col-md-4 d-flex justify-content-between text-primary"
};

export default Account;
