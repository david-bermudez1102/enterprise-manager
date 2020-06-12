import React from "react"
import Avatar from "../Home/SideBar/Avatar"
import { List } from "antd"
import {
  UserDeleteOutlined,
  PoweroffOutlined,
  MailOutlined,
  SettingOutlined,
  UnlockOutlined
} from "@ant-design/icons"
import { NavLink } from "react-router-dom"
import capitalize from "capitalize"

const Account = ({ account }) => {
  return (
    <List.Item
      key={`listed_account_${account.id}`}
      actions={[
        <MailOutlined />,
        <NavLink to={`/accounts/${account.id}/edit`} activeClassName='active'>
          <SettingOutlined />
        </NavLink>,
        <PoweroffOutlined />,
        <UnlockOutlined />,
        <UserDeleteOutlined />
      ]}>
      <List.Item.Meta
        avatar={
          <Avatar currentUser={account} style={{ zIndex: 1 }} size={50} />
        }
        title={capitalize.words(account.name)}
        description={`Role: ${account.type}`}
      />
    </List.Item>
  )
}

export default React.memo(Account)
