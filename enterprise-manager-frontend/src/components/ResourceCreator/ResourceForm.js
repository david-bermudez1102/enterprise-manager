import React, { useEffect } from "react"
import { useHistory, useLocation, useRouteMatch } from "react-router-dom"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Form, Input, Button } from "antd"
import Permissions from "../Permissions"
import usePermissions from "../Permissions/Hooks/usePermissions"

const ResourceForm = ({ addResource, updateResource, url, resource }) => {
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const { organizationId } = session.currentUser
  const [form] = Form.useForm()
  const {
    onPermissionsChange,
    onCheckAllChange,
    onExclusionChange,
    permissionAttributes,
    attrCount
  } = usePermissions({
    permissionAttributes: resource ? resource.permissionAttributes : null
  })

  const { formAlias } = match.params

  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue({ name: resource ? resource.name : "" })
    // eslint-disable-next-line
  }, [location])

  const onFinish = data => {
    if (addResource)
      dispatch(
        addResource({ ...data, organizationId, permissionAttributes })
      ).then(resource =>
        resource
          ? history.push(
              `/organizations/${organizationId}/resource/${resource.formAlias}`
            )
          : null
      )
    else if (updateResource)
      dispatch(
        updateResource({
          ...data,
          id: resource.id,
          organizationId,
          permissionAttributes
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
      labelCol={{ span: 5 }}
      form={form}
      name={"resource_form"}
      onFinish={onFinish}
      layout={"horizontal"}>
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
          size='large'
          prefix={<i className='fas fa-layer-group'></i>}
          placeholder='Enter resource name...'
        />
      </Form.Item>
      <Form.Item label={"Permissions"} required>
        <Permissions
          onChange={onPermissionsChange}
          onCheckAllChange={onCheckAllChange}
          onExclusionChange={onExclusionChange}
          permissionAttributes={permissionAttributes}
          attrCount={attrCount}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
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
