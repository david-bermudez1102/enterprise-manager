import React from "react"
import { List, Avatar } from "antd"
import {
  UserDeleteOutlined,
  PoweroffOutlined,
  MailOutlined,
  SettingOutlined,
  UnlockOutlined
} from "@ant-design/icons"
import { Link, useRouteMatch } from "react-router-dom"
import capitalize from "capitalize"
import IconWrapper from "../Icons/IconWrapper"
import defaultAvatar from "../../default_user.png"

const Account = ({ account }) => {
  const match = useRouteMatch()
  return (
    <List.Item
      key={`listed_account_${account.id}`}
      actions={[
        <MailOutlined />,
        <Link
          to={`${match.url}/${account.id}/edit`}
          style={{ color: "inherit" }}>
          <SettingOutlined />
        </Link>,
        <PoweroffOutlined />,
        <UnlockOutlined />,
        <UserDeleteOutlined />
      ]}>
      <List.Item.Meta
        avatar={
          <Avatar src={account.avatarSrc || defaultAvatar} size={"large"} />
        }
        title={capitalize.words(account.name)}
        description={
          account.isRoot ? (
            <>
              <IconWrapper className='fal fa-shield-alt' /> Root
            </>
          ) : (
            <>
              <IconWrapper className='fal fa-tags' /> Roles:{" "}
              {account.roleNames.join(", ")}
            </>
          )
        }
      />
    </List.Item>
  )
}

export default React.memo(Account)
