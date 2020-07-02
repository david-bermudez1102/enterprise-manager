import React from "react"
import { useSelector, shallowEqual } from "react-redux"
import { Card, Descriptions, Avatar, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import defaultAvatar from "../../../default_user.png"
import IconWrapper from "../../Icons/IconWrapper"

const AccountInfo = () => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const { currentUser } = session
  const accountInfo = [
    {
      label: "Avatar",
      value: (
        <>
          <Avatar src={currentUser.avatarSrc || defaultAvatar} />{" "}
          <Button icon={<UploadOutlined />} type={"dashed"}>
            Change
          </Button>
        </>
      )
    },
    { label: "Name", value: currentUser.name },
    { label: "Email", value: currentUser.email },
    { label: "Status", value: "Active" },
    {
      label: "Roles",
      value: currentUser.isRoot ? "Root" : currentUser.roleNames.join(", ")
    },
    {
      label: "Address",
      value: "123 Fake St"
    },
    { label: "Phone No.", value: 1234567890 }
  ]

  return (
    <Card
      bodyStyle={{
        paddingTop: 12,
        paddingBottom: 12,
        marginBottom: 12
      }}
      bordered={false}
      loading={false}>
      <Descriptions
        title={
          <>
            <IconWrapper
              className='fal fa-id-badge'
              style={{ marginRight: 10 }}
            />
            Account Information
          </>
        }
        bordered
        size={"small"}
        column={1}
        style={{ border: 0 }}>
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
