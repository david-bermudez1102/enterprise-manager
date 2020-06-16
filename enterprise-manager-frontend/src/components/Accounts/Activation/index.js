import React from "react"
import { Card } from "antd"
import Title from "antd/lib/typography/Title"
import { LockOutlined } from "@ant-design/icons"
import Text from "antd/lib/typography/Text"
import ConfirmPasswordForm from "./Form"
import { activate } from "../../../actions/activationActions"

const RootActivation = props => {
  const { name, token } = props.token

  return (
    <Card
      bordered={false}
      style={{ background: "transparent" }}
      title={
        <>
          <Title level={3} style={{ marginBottom: 0 }}>
            <LockOutlined /> Confirm Password
          </Title>
          <Text>
            Hey {name}, let's confirm your password to activate your account.
          </Text>
        </>
      }>
      <ConfirmPasswordForm token={token} handleSubmit={activate} />
    </Card>
  )
}

export default RootActivation
