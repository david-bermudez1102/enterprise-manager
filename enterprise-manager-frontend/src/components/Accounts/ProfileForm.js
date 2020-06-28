import React, { useState, useEffect } from "react"
import {
  Form,
  Divider,
  Input,
  Select,
  Button,
  Row,
  Col,
  Upload,
  Avatar
} from "antd"
import Title from "antd/lib/typography/Title"
import ImgCrop from "antd-img-crop"
import { UploadOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { updateAccount } from "../../actions/accountActions"
import defaultUser from "../../default_user.png"
import snakecaseKeys from "snakecase-keys"
import imageCompression from "browser-image-compression"

const ProfileForm = props => {
  const { currentUser } = props
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const [avatar, setAvatar] = useState()

  const [state, setState] = useState({
    avatarSrc: currentUser.avatar ? currentUser.avatarSrc : defaultUser,
    fileList: currentUser.avatar
      ? [
          {
            uid: currentUser.avatar.blob.key,
            name: currentUser.avatar.blob.filename,
            status: "done",
            url: currentUser.avatarSrc
          }
        ]
      : [],
    filePreview: currentUser.avatar ? currentUser.avatarSrc : null
  })

  const handleAvatarChange = ({ fileList: newFileList }) => {
    setState({
      ...state,
      fileList: [
        ...state.fileList,
        ...newFileList.map(f => ({ ...f, status: "done" }))
      ]
    })
  }

  const handleSubmit = data => {
    dispatch(
      updateAccount({ ...snakecaseKeys({ ...currentUser, ...data }), avatar })
    )
  }

  const uploadFile = ({ file }) => {
    URL.revokeObjectURL(state.avatarUrl)
    const newPreview = URL.createObjectURL(file)
    setState({ ...state, avatarSrc: newPreview })

    imageCompression(file, { maxSizeMB: 0.2, maxWidthOrHeight: 500 }).then(
      setAvatar
    )
  }

  const onPreview = file => {
    window.open(state.avatarSrc)
  }

  useEffect(() => {
    form.setFieldsValue(currentUser)
  }, [currentUser])

  return (
    <Form form={form} onFinish={handleSubmit} layout={"vertical"}>
      <Row gutter={[24, 24]} justify={"center"}>
        <Col span={24} xl={16} lg={24} order={2}>
          <Title level={4}>Account Settings</Title>
          <Divider />
          <Form.Item name='name' label={"Your Name"}>
            <Input id='account_name' placeholder='Enter name...' />
          </Form.Item>
          <Form.Item name='email' label={"Your Email"}>
            <Input id='account_email' />
          </Form.Item>
          <Form.Item name='gender' label={"Gender"}>
            <Select id='account_gender' placeholder={"Select"}></Select>
          </Form.Item>
          <Divider />
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Save Changes
            </Button>
          </Form.Item>
        </Col>
        <Col
          flex={"auto"}
          order={1}
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            flexDirection: "column"
          }}>
          <span style={{ width: "100%", textAlign: "center" }}>
            <Title level={4} type={"secondary"}>
              {currentUser.name}
            </Title>
          </span>
          <span style={{ width: "100%", textAlign: "center" }}>
            <Avatar
              size={"large"}
              style={{ width: 150, height: 150 }}
              src={state.avatarSrc}
            />
          </span>
          <span style={{ width: "100%", textAlign: "center", marginTop: 16 }}>
            <ImgCrop rotate shape={"round"}>
              <Upload
                accept='image/*'
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true
                }}
                fileList={state.fileList}
                onPreview={onPreview}
                onChange={handleAvatarChange}
                customRequest={uploadFile}
                onRemove={() => {
                  URL.revokeObjectURL(state.avatarSrc)
                  setState({
                    fileList: [],
                    filePreview: null,
                    avatarSrc: defaultUser
                  })
                }}
                listType='picture'>
                {state.fileList.length < 1 && (
                  <Button icon={<UploadOutlined />} block>
                    Change Avatar
                  </Button>
                )}
              </Upload>
            </ImgCrop>
          </span>
        </Col>
      </Row>
    </Form>
  )
}
export default ProfileForm
