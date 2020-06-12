import React from "react"
import { List, Button } from "antd"
import { useSelector, shallowEqual } from "react-redux"
import { EditTwoTone, DeleteOutlined } from "@ant-design/icons"
import { Link, useRouteMatch } from "react-router-dom"
import Title from "antd/lib/typography/Title"

const RolesList = props => {
  const { roles } = useSelector(({ roles }) => ({ roles }), shallowEqual)
  const match = useRouteMatch()

  return (
    <List
      header={<Title level={3}>Roles</Title>}
      dataSource={roles}
      renderItem={role => (
        <List.Item
          actions={[
            <Button type={"link"}>
              <Link to={`${match.url}/${role.id}/edit`}>
                <EditTwoTone />
              </Link>
            </Button>,

            <Button type={"link"} danger>
              <Link to={`${match.url}/${role.id}/delete`}>
                <DeleteOutlined />
              </Link>
            </Button>
          ]}>
          {role.name}
        </List.Item>
      )}
    />
  )
}

export default RolesList
