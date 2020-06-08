import React from "react"
import { Row, Col, List, Switch, Card } from "antd"

const settings = [
  { description: "Show timestamps" },
  { description: "Show ZohoBooks Id" },
  { description: "Show QuickBooks Id" },
  { description: `Show column "Sent to ZohoBooks?"` }
]
const ResourceSettings = ({ resource }) => {
  return (
    <Col span={24}>
      <Card bordered={false}>
        <Row gutter={[16, 16]} justify={"center"} align={"middle"}>
          <Col xl={10} lg={12} md={24} span={24}>
            <List
              size='large'
              dataSource={settings}
              renderItem={setting => (
                <List.Item>
                  <List.Item.Meta description={setting.description} />
                  <Switch defaultChecked />
                </List.Item>
              )}></List>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default React.memo(ResourceSettings)
