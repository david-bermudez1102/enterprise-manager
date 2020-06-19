import React, { useEffect } from "react"
import usePermissions from "../../../Permissions/Hooks/usePermissions"
import Permissions from "../../../Permissions"
import {
  addPagePermission,
  updatePagePermission,
  fetchPagePermissions
} from "../../../../actions/pagePermissionsActions"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Form, Button } from "antd"

const PagesPermissions = ({ pageName }) => {
  const { session, pagePermissions } = useSelector(
    ({ session, pagePermissions }) => ({ session, pagePermissions }),
    shallowEqual
  )
  const { currentUser } = session
  const { permissionAttributes } = pagePermissions[pageName] || {}
  const dispatch = useDispatch()
  const permissions = usePermissions({
    permissionAttributes
  })

  const onFinish = data => {
    pagePermissions[pageName]
      ? dispatch(
          updatePagePermission({
            id: pagePermissions[pageName].id,
            permissionAttributes: permissions.permissionAttributes,
            pageName,
            organizationId: currentUser.organizationId
          })
        )
      : dispatch(
          addPagePermission({
            permissionAttributes: permissions.permissionAttributes,
            pageName,
            organizationId: currentUser.organizationId
          })
        )
  }

  useEffect(() => {
    dispatch(fetchPagePermissions(currentUser.organizationId))
  }, [])

  return (
    <Form
      labelCol={{ span: 5 }}
      name={"resource_form"}
      onFinish={onFinish}
      layout={"horizontal"}>
      <Form.Item>
        <Permissions {...permissions} />
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType={"submit"}>
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PagesPermissions
