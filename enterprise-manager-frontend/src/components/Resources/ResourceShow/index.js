import React from "react"
import { Row, Col, List } from "antd"
import {
  FundViewOutlined,
  AppstoreAddOutlined,
  TableOutlined
} from "@ant-design/icons"
import { plural, singular } from "pluralize"
import { Link, useRouteMatch } from "react-router-dom"

const ResourceShow = ({ resource }) => {
  const match = useRouteMatch()
  const options = [
    {
      title: `View All ${plural(resource.name)}`,
      description: <TableOutlined style={{ fontSize: "100px" }} />,
      link: `${match.url}/records`
    },
    {
      title: `Add New ${singular(resource.name)}`,
      description: <AppstoreAddOutlined style={{ fontSize: "100px" }} />,
      link: `${match.url}/new`
    },
    {
      title: "View Statistics",
      description: <FundViewOutlined style={{ fontSize: "100px" }} />,
      link: `${match.url}/statistics`
    }
  ]
  return (
    <Col span={24}>
      <Row
        justify={"center"}
        align={"middle"}
        style={{ background: "#fff", height: "100%" }}>
        <Col span={24}>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={options}
            itemLayout={"vertical"}
            renderItem={item => (
              <List.Item
                style={{
                  textAlign: "center",
                  marginBottom: 0,
                  height: "100%"
                }}>
                <Link to={item.link}>
                  {item.description}
                  <List.Item.Meta
                    description={item.title}
                    style={{ marginBottom: 0 }}
                  />
                </Link>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Col>
  )
}
export default React.memo(ResourceShow)
