import React, { useState } from "react"
import ImgCrop from "antd-img-crop"
import { Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"

const LogoUploader = ({ handleLogoChange }) => {
  const [fileList, setFileList] = useState([])
  const [filePreview, setfilePreview] = useState()
  const onLogoChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.map(f => ({ ...f, status: "done" })))
  }

  const uploadFile = ({ file }) => {
    URL.revokeObjectURL(filePreview)
    const newPreview = URL.createObjectURL(file)
    setfilePreview(newPreview)
    handleLogoChange(file)
  }

  const onPreview = file => {
    window.open(filePreview)
  }

  console.log(fileList)

  return (
    <ImgCrop aspect={3} rotate>
      <Upload
        className={"logo-uploader"}
        fileList={fileList}
        onChange={onLogoChange}
        onPreview={onPreview}
        onRemove={() => URL.revokeObjectURL(filePreview)}
        listType='picture'
        customRequest={uploadFile}>
        {fileList.length < 1 && (
          <Button type={"dashed"} block>
            <UploadOutlined /> Click to Upload Company Logo
          </Button>
        )}
      </Upload>
    </ImgCrop>
  )
}

export default LogoUploader
