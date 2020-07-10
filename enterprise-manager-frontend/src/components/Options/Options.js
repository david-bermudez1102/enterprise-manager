import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

const Options = ({ url, content, permission }) => {
  const location = useLocation()
  const { canDelete, canUpdate } = permission

  return (
    (canDelete || canUpdate) && (
      <Menu size={"small"} mode={"vertical"} selectedKeys={[location.pathname]}>
        {canDelete && (
          <Menu.Item
            key={`${url}/${content.id}/delete`}
            icon={<DeleteOutlined />}>
            <Link to={`${url}/${content.id}/delete`}>Delete Field</Link>
          </Menu.Item>
        )}
        {canUpdate && (
          <Menu.Item icon={<EditOutlined />} key={`${url}/${content.id}/edit`}>
            <Link to={`${url}/${content.id}/edit`}>Edit Field</Link>
          </Menu.Item>
        )}
      </Menu>
    )
  )
}

export default Options
