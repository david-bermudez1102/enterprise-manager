import React from "react"
import { Card } from "antd"

const ResetContainer = () => {
  return (
    <Card header={<span className='display-4'>Reset Password</span>}>
      <ResetForm />
    </Card>
  )
}

export default ResetContainer
