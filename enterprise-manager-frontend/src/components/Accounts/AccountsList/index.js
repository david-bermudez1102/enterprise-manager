import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { List } from "antd";
import Account from "../Account";

const AccountsList = ({ accounts }) => {
  const admins = useSelector(state => state.admins, shallowEqual);
  const managers = accounts.filter(account => account.type === "Manager");
  const employees = accounts.filter(account => account.type === "Employee");
  return (
    <List
      itemLayout="horizontal"
      size={"large"}
      dataSource={[...admins, ...managers, ...employees]}
      renderItem={item => <Account account={item} />}></List>
  );
};

export default AccountsList;
