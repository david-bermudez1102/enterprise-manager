import React from "react"
import { Result, Button, Col } from "antd"

const Forbidden = props => {
  return (
    <Col span={24} style={{ textAlign: "center" }}>
      <Result
        status='403'
        title='401'
        subTitle='Sorry, you are not authorized to access this page.'
        extra={<Button type='primary'>Back Home</Button>}
      />
    </Col>
  )
}
export default Forbidden
