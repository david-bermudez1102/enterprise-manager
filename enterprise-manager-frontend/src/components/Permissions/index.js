import React from "react"
import { List, Checkbox, Form } from "antd"
import { useSelector, shallowEqual } from "react-redux"

const assignments = [
  { name: "createPrivilege", description: "Create" },
  { name: "readPrivilege", description: "Read" },
  { name: "updatePrivilege", description: "Update" },
  { name: "insertPrivilege", description: "Insert" },
  { name: "deletePrivilege", description: "Delete" }
]

const Permissions = props => {
  const { onChange, permissionAttributes } = props
  const { assignmentsAttributes } = permissionAttributes || {}
  const { roles } = useSelector(({ roles }) => ({ roles }), shallowEqual)

  return (
    <List
      size={"small"}
      split={false}
      style={{ padding: 0 }}
      dataSource={assignments}
      renderItem={item => (
        <List.Item style={{ padding: 0 }}>
          <Form.Item
            label={item.description}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            colon={false}
            style={{ marginBottom: 0, width: "100%" }}>
            <Checkbox.Group
              defaultValue={(assignmentsAttributes || []).map(a =>
                a[item.name] ? a.roleId : undefined
              )}
              name={item.name}
              options={roles.map(role => ({
                label: role.name,
                value: role.id,
                onChange,
                defaultChecked: role.defaultChecked
              }))}
            />
          </Form.Item>
        </List.Item>
      )}
    />
  )
}

export default Permissions
