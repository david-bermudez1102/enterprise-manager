import React, { useEffect, useState } from "react"
import { Form, Input, Button, Checkbox, Divider, Col, Row } from "antd"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { addRole, updateRole } from "../../../actions/rolesActions"
import { useHistory } from "react-router-dom"

const assignments = [
  {
    label: "Create",
    value: "createPrivilege"
  },
  {
    label: "Read",
    value: "readPrivilege"
  },
  {
    label: "Update",
    value: "updatePrivilege"
  },
  {
    label: "Insert",
    value: "insertPrivilege"
  },
  {
    label: "Delete",
    value: "deletePrivilege"
  }
]

const RolesForm = props => {
  const history = useHistory()
  const { role } = props
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const [
    defaultPermissionAttributes,
    setDefaultPermissionAttributes
  ] = useState(
    role && role.defaultPermissionAttributes
      ? role.defaultPermissionAttributes
      : {
          permissionAttributes: {
            assignmentsAttributes: [{}]
          }
        }
  )

  const { organizationId } = session.currentUser
  const [checked, setChecked] = useState([])
  const [checkAll, setCheckAll] = useState(
    assignments.filter(
      a =>
        defaultPermissionAttributes.permissionAttributes
          .assignmentsAttributes[0][a.value]
    ).length === assignments.length
  )
  const [form] = Form.useForm()

  const dispatch = useDispatch()

  const onFinish = data => {
    role
      ? dispatch(
          updateRole({
            organizationId,
            ...role,
            ...data,
            defaultPermissionAttributes
          })
        )
      : dispatch(
          addRole({ organizationId, ...data, defaultPermissionAttributes })
        ).then(role => history.push(`/organizations/${organizationId}/roles`))
  }

  const onChange = checked => setChecked(checked)

  useEffect(() => {
    setChecked(
      role && role.defaultPermissionAttributes
        ? Object.entries(
            role.defaultPermissionAttributes.permissionAttributes
              .assignmentsAttributes[0]
          )
            .filter(([key, val]) => val === true)
            .map(([key, val]) => key)
        : []
    )
  }, [role])

  useEffect(() => {
    setDefaultPermissionAttributes({
      permissionAttributes: {
        assignmentsAttributes: [
          {
            id:
              role && role.defaultPermissionAttributes
                ? role.defaultPermissionAttributes.permissionAttributes
                    .assignmentsAttributes[0].id
                : undefined,
            roleId: role ? role.id : undefined,
            ...assignments
              .map(a => ({ [a.value]: false }))
              .reduce((obj, item) => ({ ...obj, ...item }), {}),
            ...checked
              .map(key => ({ [key]: true }))
              .reduce((obj, item) => ({ ...obj, ...item }), {})
          }
        ]
      }
    })
  }, [checked, role])

  useEffect(() => {
    form.setFieldsValue({
      name: role ? role.name : "",
      defaultPermissionAttributes:
        role && role.defaultPermissionAttributes
          ? Object.entries(
              role.defaultPermissionAttributes.permissionAttributes
                .assignmentsAttributes[0]
            )
              .filter(([key, val]) => val === true)
              .map(([key, val]) => key)
          : undefined
    })
  }, [role, form])

  useEffect(() => {
    setDefaultPermissionAttributes(
      role && role.defaultPermissionAttributes
        ? role.defaultPermissionAttributes
        : {
            permissionAttributes: {
              assignmentsAttributes: [{}]
            }
          }
    )
  }, [role])

  useEffect(() => {
    setCheckAll(
      assignments.filter(
        a =>
          defaultPermissionAttributes.permissionAttributes
            .assignmentsAttributes[0][a.value]
      ).length === assignments.length
    )
  }, [defaultPermissionAttributes])

  const onCheckAllChange = e => {
    setChecked(e.target.checked ? assignments.map(a => a.value) : [])
    setCheckAll(e.target.checked)
  }

  console.log(defaultPermissionAttributes)

  return (
    <Form form={form} layout={"horizontal"} onFinish={onFinish}>
      <Form.Item
        name={"name"}
        label={"Name"}
        rules={[{ required: true, message: "Enter a valid name" }]}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}>
        <Input />
      </Form.Item>

      <Form.Item
        label={"Default Permissions"}
        labelCol={{ span: 24 }}
        colon={true}
        wrapperCol={{ span: 20, offset: 4 }}
        rules={[
          { required: true, message: "At least one permission is required." }
        ]}>
        <Checkbox
          name={""}
          onChange={onCheckAllChange}
          checked={checkAll}
          indeterminate={checked.length && checked.length < assignments.length}>
          Check All
        </Checkbox>
        <Divider style={{ margin: "5px 0 4px 0" }} />
        <Checkbox.Group
          style={{ width: "100%" }}
          name={"defaultPermissionAttributes"}
          value={checked}
          onChange={onChange}>
          <Row gutter={[8, 8]}>
            {assignments.map((assignment, i) => (
              <Col span={12} sm={8} xl={6} key={`assignment_attr_${i}`}>
                <Checkbox value={assignment.value}>{assignment.label}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType={"submit"}>
          {role ? <>Update Role</> : <>Add Role</>}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RolesForm
