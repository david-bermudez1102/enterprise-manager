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
  {
    title: "Resend Confirmation Email",
    className: "fas fa-envelope",
    action: "confirmation_email"
  },
  {
    title: "Disable Account",
    className: "fas fa-power-off",
    action: "disable"
  },
  { title: "", className: "fas fa-unlock", action: "edit" },
  { title: "Edit Account", className: "fas fa-pen", action: "edit" },
  {
    title: "Delete this account",
    className: "fas fa-user-times",
    action: "delete"
  }
];

const Account = ({ account }) => {
  const roleIcon = roleIcons.find(icon => icon.type === account.type);
  return (
    <div className={classNames.listItem} style={{ fontSize: "22px", cursor: "pointer" }}>
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
            <Link to={`/accounts/${account.id}/${icon.action}`} className="text-light p-0 m-0">
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
    "row border-0 shadow-sm rounded list-group-item py-md-3 py-sm-2 mb-1 d-flex align-items-center justify-content-between display-4 list-group-item-action px-3",
  firstCol: "d-flex order-2 order-xl-1 py-2 py-xl-0 px-0 col-xl-6 align-items-center",
  secondCol:
    "order-1 order-xl-2 col-xl-6 px-0 py-2 py-xl-0 d-flex justify-content-between text-primary"
};

export default Account;
