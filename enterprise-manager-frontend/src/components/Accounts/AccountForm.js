import React, { useEffect } from "react"
import { Form, Input, Select, Button } from "antd"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

const AccountForm = props => {
  const { account } = props
  const { roles, session } = useSelector(
    ({ roles, session }) => ({ roles, session }),
    shallowEqual
  )
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue(account)
  }, [account])

  const handleSubmit = data => {
    const { addAccount, updateAccount } = props
    if (updateAccount)
      dispatch(
        updateAccount({
          organizationId: session.currentUser.organizationId,
          ...data
        })
      )
    else
      dispatch(
        addAccount({
          organizationId: session.currentUser.organizationId,
          ...data
        })
      )
  }

  return (
    <Form
      onValuesChange={console.log}
      form={form}
      name='account_form'
      onFinish={handleSubmit}
      layout='vertical'>
      <Form.Item
        name='name'
        label={"Employee Name"}
        rules={[
          {
            required: true,
            message: "Please enter a valid name!"
          }
        ]}>
        <Input id='account_name' placeholder='Enter name...' />
      </Form.Item>
      <Form.Item
        name='email'
        label={"Employee Email"}
        rules={[
          {
            required: true,
            message: "Please enter a valid Email!"
          }
        ]}>
        <Input id='account_email' placeholder='Enter email...' />
      </Form.Item>
      <Form.Item
        name='roleIds'
        label={"Employee Role"}
        rules={[
          {
            required: true,
            message: "Please enter a valid role!"
          }
        ]}>
        <Select
          optionFilterProp={"label"}
          mode={"multiple"}
          options={roles.map(role => ({ label: role.name, value: role.id }))}
          placeholder={"Select"}
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
export default AccountForm
