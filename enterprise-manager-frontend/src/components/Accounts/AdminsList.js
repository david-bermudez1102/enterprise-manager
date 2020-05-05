import React from "react";
import cuid from "cuid";
import Account from "./Account";

const AdminsList = props => {
  const { admins } = props;
  return admins.map(admin => <Account key={cuid()} account={admin} />);
};
export default React.memo(AdminsList);
