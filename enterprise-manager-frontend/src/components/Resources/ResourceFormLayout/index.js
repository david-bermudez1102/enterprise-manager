import React from "react"
import { Col, Row, Divider, Card } from "antd"
import Title from "antd/lib/typography/Title"
import ResourceForm from "../../ResourceCreator/ResourceForm"
import { addResource, updateResource } from "../../../actions/resourceActions"
import { useRouteMatch } from "react-router-dom"
import Icon from "@ant-design/icons"

const ResourceFormLayout = ({ title, resource }) => {
  const match = useRouteMatch()
  return (
    <Col span={24}>
      <Card bordered={false}>
        <Row justify={"center"} align={"middle"} style={{ height: "100%" }}>
          <Col xxl={8} xl={10} lg={12} md={24}>
            <Title level={4} style={{ marginBottom: 0, paddingTop: "1em" }}>
              <Icon
                style={{ verticalAlign: 0 }}
                component={() => <i className='fal fa-layer-plus'></i>}
              />{" "}
              {title}
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
