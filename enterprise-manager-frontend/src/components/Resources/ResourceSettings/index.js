import React from "react"
import { Row, Col, List, Switch } from "antd"
import { FieldTimeOutlined } from "@ant-design/icons"

const ResourceSettings = ({ resource }) => {
  return (
    <Col span={24}>
      <Row gutter={[16, 16]} justify={"center"} align={"middle"}>
        <Col xl={8} lg={12} md={24} span={24}>
          <List size='large' style={{ background: "#fff" }}>
            <List.Item>
              <List.Item.Meta
                avatar={<FieldTimeOutlined />}
                description='Show timestamps'
              />
              <Switch defaultChecked />
            </List.Item>
          </List>
        </Col>
      </Row>
    </Col>
  )
}

export default React.memo(ResourceSettings)
