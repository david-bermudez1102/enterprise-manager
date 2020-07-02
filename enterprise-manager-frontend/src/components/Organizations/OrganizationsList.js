import React from "react"
import { List } from "antd"
import { useSelector, shallowEqual } from "react-redux"

const OrganizationsList = () => {
  const { organizations } = useSelector(
    ({ organizations }) => ({ organizations }),
    shallowEqual
  )
  return (
    <List
      dataSource={organizations}
      renderItem={organization => <List.Item>{organization.name}</List.Item>}
    />
  )
}

export default OrganizationsList
