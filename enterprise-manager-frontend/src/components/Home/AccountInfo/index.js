import React from "react"
import { useSelector, shallowEqual } from "react-redux"
import { Card, Descriptions, Avatar, Button } from "antd"
import { UploadOutlined, UserOutlined } from "@ant-design/icons"
import defaultAvatar from "../../../default_user.png"
import IconWrapper from "../../Icons/IconWrapper"

const AccountInfo = () => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const { currentUser } = session
  const accountInfo = [
    {
      label: (
        <>
          <IconWrapper
            className='fal fa-user-circle'
            style={{ marginRight: 10 }}
          />
          Avatar
        </>
      ),
      value: (
        <>
          <Avatar src={currentUser.avatarSrc || defaultAvatar} />{" "}
          <Button icon={<UploadOutlined />} type={"dashed"}>
            Change
          </Button>
        </>
      )
    },
    {
      label: (
        <>
          <UserOutlined style={{ marginRight: 10 }} />
          Name
        </>
      ),
      value: currentUser.name
    },
    {
      label: (
        <>
          <IconWrapper className='fal fa-at' style={{ marginRight: 10 }} />
          Email
        </>
      ),
      value: currentUser.email
    },
    {
      label: (
        <>
          <IconWrapper
            className='fal fa-dot-circle'
            style={{ marginRight: 10 }}
          />{" "}
          Status
        </>
      ),
      value: "Active"
    },
    {
      label: (
        <>
          <IconWrapper className='fal fa-tags' style={{ marginRight: 10 }} />
          Roles
        </>
      ),
      value: currentUser.isRoot ? "Root" : currentUser.roleNames.join(", ")
    },
    {
      label: (
        <>
          <IconWrapper
            className='fal fa-map-marker-alt'
            style={{ marginRight: 10 }}
          />
          Address
        </>
      ),
      value: "123 Fake St"
    },
    {
      label: (
        <>
          <IconWrapper
            className='fal fa-phone-alt'
            style={{ marginRight: 10 }}
          />
          Phone No.
        </>
      ),
      value: 1234567890
    }
  ]

  return (
    <Card
      bodyStyle={{
        padding: 0,
        marginBottom: 12
      }}
      bordered={false}
      title={
        <>
          <IconWrapper
            className='fal fa-id-badge'
            style={{ marginRight: 10 }}
          />
          Account Information
        </>
      }
      extra={[<IconWrapper className='far fa-external-link' />]}
      loading={false}>
      <Descriptions bordered size={"small"} column={1} style={{ border: 0 }}>
        {accountInfo.map((d, i) => (
          <Descriptions.Item
            key={`account_info_${currentUser.id}_${i}`}
            label={d.label}>
            {d.value}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  )
}

export default AccountInfo
