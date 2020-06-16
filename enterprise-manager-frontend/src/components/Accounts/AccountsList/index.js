import React from "react"
import { List } from "antd"
import Account from "../Account"

const AccountsList = ({ accounts }) => {
  return (
    <List
      itemLayout='horizontal'
      size={"large"}
      dataSource={[...accounts]}
      renderItem={item => <Account account={item} />}></List>
  )
}

export default AccountsList
