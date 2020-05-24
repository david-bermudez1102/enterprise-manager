import React, { useEffect } from "react"
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory
} from "react-router-dom"
import { useSelector, shallowEqual } from "react-redux"
import pluralize from "pluralize"
import { Card, Badge, Row, Col, Popover, Menu, Button, Empty } from "antd"
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
  GroupOutlined
} from "@ant-design/icons"
import Title from "antd/lib/typography/Title"
import useModal from "../Modal/Hooks/useModal"
import DeletionModal from "../Modal/DeletionModal"
import { removeResource } from "../../actions/resourceActions"
import AddResourceButton from "./AddResourceButton"
import Statistics from "./Statistics"

const ResourcesList = ({ loaded, loading }) => {
  const location = useLocation()
  const match = useRouteMatch()
  const history = useHistory()
  const { showModal, ...deletionModal } = useModal()
  const { resources } = useSelector(
    ({ resources }) => ({ resources }),
    shallowEqual
  )

  useEffect(() => {
    if (
      resources.length === 0 &&
      location.pathname !== `${match.url}/new` &&
      loaded
    ) {
      history.push(`${match.url}/new`)
    }
    // eslint-disable-next-line
  }, [resources, location, loaded])

  if (resources.length === 0)
    return (
      <Col span={24} style={{ background: "#fff" }}>
        <Empty description={"There are no resources created yet."}>
          <AddResourceButton />
        </Empty>
      </Col>
    )
  return (
    <Col span={24}>
      <Row gutter={[16, 16]}>
        {resources.map(resource => {
          return (
            <Col
              xl={8}
              lg={12}
              md={24}
              span={24}
              key={`resource_listed_${resource.id}`}>
              <Card
                hoverable
                activeTabKey={location.pathname}
                key={`resource_card_${resource.id}`}
                style={{ width: "100%", height: "100%" }}
                title={
                  <Title level={3} style={{ marginBottom: 0 }}>
                    <i className='fas fa-layer-group'></i> {resource.name}
                  </Title>
                }
                actions={[
                  <NavLink to={`${match.url}/${resource.formAlias}/records`}>
                    <Badge
                      count={resource.recordsCount}
                      overflowCount={999}
                      offset={[10, -3]}>
                      <GroupOutlined />
                    </Badge>
                  </NavLink>,
                  <NavLink to={`${match.url}/${resource.formAlias}/settings`}>
                    <SettingOutlined key='setting' />
                  </NavLink>,
                  <NavLink to={`${match.url}/${resource.formAlias}/edit`}>
                    <EditOutlined
                      key={`${match.url}/${resource.formAlias}/edit`}
                    />
                  </NavLink>,
                  <Popover
                    content={
                      <Menu mode='vertical'>
                        <Menu.Item key='1' title={"Delete resource"}>
                          <Button
                            type='link'
                            icon={<DeleteOutlined />}
                            onClick={() =>
                              showModal({
                                title: `Delete resource ${pluralize(
                                  resource.name
                                )}`,
                                text:
                                  "All of the associated content will be deleted!",
                                action: removeResource(
                                  resource.organizationId,
                                  resource.id
                                )
                              })
                            }
                            block
                            ghost
                            danger>
                            Delete Resource
                          </Button>
                        </Menu.Item>
                      </Menu>
                    }
                    title='More Options'
                    style={{ position: "relative", zIndex: 1 }}
                    trigger={["click"]}>
                    <EllipsisOutlined key='ellipsis' />
                  </Popover>
                ]}
                size={"small"}
                extra={
                  <NavLink to={`${match.url}/${resource.formAlias}`}>
                    <i
                      className='fad fa-plus-circle'
                      style={{ fontSize: "24px" }}></i>
                  </NavLink>
                }>
                <Card.Meta description={<Statistics resource={resource} />} />
              </Card>
            </Col>
          )
        })}
        <Col flex={"auto"}>
          <AddResourceButton />
        </Col>
        <DeletionModal {...deletionModal} />
      </Row>
    </Col>
  )
}

export default React.memo(ResourcesList)
