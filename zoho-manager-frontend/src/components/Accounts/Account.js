import React from "react";
import Options from "../Options/Options";

const icons = [
  { type: "Admin", className: "fas fa-user-cog" },
  { type: "Manager", className: "fas fa-user-shield" },
  { type: "Employee", className: "fas fa-user" }
];
const Account = ({ account }) => (
  <div className="list-group-item">
    <span>
      <i
        className={icons.find(icon => icon.type === account.type).className}
        title="Employee"></i>
      {account.name}
    </span>
    <Options content={account} />
  </div>
);

export default Account;
