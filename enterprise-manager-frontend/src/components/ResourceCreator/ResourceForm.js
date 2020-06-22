import React, { useEffect } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Form, Input, Button } from "antd"
import Permissions from "../Permissions"
import usePermissions from "../Permissions/Hooks/usePermissions"
import IconWrapper from "../Icons/IconWrapper"

const ResourceForm = ({ addResource, updateResource, url, resource }) => {
  const history = useHistory()
  const match = useRouteMatch()
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const { organizationId } = session.currentUser
  const [form] = Form.useForm()
  const permissions = usePermissions({
    permissionAttributes: resource ? resource.permissionAttributes : null
  })

  const { formAlias } = match.params

  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue({ name: resource ? resource.name : "" })
    // eslint-disable-next-line
  }, [resource])

  const onFinish = data => {
    if (addResource)
      dispatch(
        addResource({
          ...data,
          organizationId,
          permissionAttributes: permissions.permissionAttributes
        })
      ).then(resource =>
        resource.formAlias
          ? history.push(
              `/organizations/${organizationId}/resources/${resource.formAlias}`
            )
          : null
      )
    else if (updateResource)
      dispatch(
        updateResource({
          ...data,
          id: resource.id,
          organizationId,
          permissionAttributes: permissions.permissionAttributes
        })
      ).then(resource =>
        resource
          ? resource.formAlias !== formAlias
            ? history.push(
                `/organizations/${organizationId}/resources/${resource.formAlias}/edit`
              )
            : null
          : null
      )
  }

  return (
    <Form
      form={form}
      name={"resource_form"}
      onFinish={onFinish}
      layout={"vertical"}>
      <Form.Item
        name='name'
        label='Name'
        rules={[
          {
            required: true,
            message: "Please enter a valid resource name!"
          }
        ]}>
        <Input
          prefix={
            <IconWrapper
              className='fal fa-layer-group'
              style={{ fontSize: 13 }}
            />
          }
          placeholder='Enter resource name...'
        />
      </Form.Item>
      <Form.Item label={"Permissions"} labelCol={{ span: 24 }} required>
        <Permissions
          {...permissions}
          readLabel={"View Resource"}
          createLabel={"Add Field"}
          updateLabel={"Update Resource"}
          deleteLabel={"Delete Resource"}
          exclude={["insertPrivilege"]}
        />
      </Form.Item>
      <Form.Item>
        <Button
          size={"large"}
          type='primary'
          htmlType='submit'
          className='login-form-button'>
          {addResource ? <>Create Resource</> : <>Update Resource</>}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default React.memo(ResourceForm)
