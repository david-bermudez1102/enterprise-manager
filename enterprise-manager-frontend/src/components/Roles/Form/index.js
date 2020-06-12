import React, { useEffect } from "react"
import { Form, Input, Button } from "antd"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { addRole, updateRole } from "../../../actions/rolesActions"

const RolesForm = props => {
  const { role } = props
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const { organizationId } = session.currentUser
  const [form] = Form.useForm()

  const dispatch = useDispatch()

  const onFinish = data => {
    role
      ? dispatch(updateRole({ organizationId, ...role, ...data }))
      : dispatch(addRole({ organizationId, ...data }))
  }

  useEffect(() => {
    form.setFieldsValue(role)
  }, [role, form])

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      layout={"horizontal"}
      onFinish={onFinish}>
      <Form.Item
        name={"name"}
        label={"Name"}
        rules={[{ required: true, message: "Enter a valid name" }]}>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type={"primary"} htmlType={"submit"}>
          {role ? <>Update Role</> : <>Add Role</>}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RolesForm
