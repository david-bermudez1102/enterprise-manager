import React from "react"
import PasswordChangeForm from "./PasswordChangeForm"
import { activate } from "../../../actions/activationActions"
import { useHistory } from "react-router-dom"
import { resetPassword } from "../../../actions/accountActions"
import { Card } from "antd"
import Title from "antd/lib/typography/Title"
import Text from "antd/lib/typography/Text"
import { LockOutlined } from "@ant-design/icons"

const PasswordChange = props => {
  const { name, activated, token } = props.token
  const history = useHistory()
  return (
    <Card
      bordered={false}
      style={{ background: "transparent" }}
      title={
        <>
          <Title level={3} style={{ marginBottom: 0 }}>
            <LockOutlined /> Create a new password
          </Title>
          <Text>Hey {name}, let's create a new password.</Text>
        </>
      }>
      <PasswordChangeForm
        token={token}
        handleSubmit={activated ? resetPassword : activate}
        history={history}
      />
    </Card>
  )
}

export default PasswordChange
