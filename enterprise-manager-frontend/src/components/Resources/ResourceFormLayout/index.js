import React from "react"
import { Col, Row, Divider, Card } from "antd"
import Title from "antd/lib/typography/Title"
import ResourceForm from "../../ResourceCreator/ResourceForm"
import { addResource, updateResource } from "../../../actions/resourceActions"
import { useRouteMatch } from "react-router-dom"

const ResourceFormLayout = ({ title, resource }) => {
  const match = useRouteMatch()
  return (
    <Col span={24}>
      <Card bordered={false}>
        <Row justify={"center"} align={"middle"} style={{ height: "100%" }}>
          <Col xl={14} lg={16} md={24}>
            <Title level={3} style={{ marginBottom: 0, paddingTop: "1em" }}>
              <i className='fas fa-layer-plus'></i> {title}
            </Title>
            <Divider />
            <ResourceForm
              url={match.url}
              addResource={resource ? undefined : addResource}
              updateResource={resource ? updateResource : undefined}
              resource={resource}
            />
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default React.memo(ResourceFormLayout)
