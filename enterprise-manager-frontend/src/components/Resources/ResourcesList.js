import React, { useEffect } from "react"
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
  Link
} from "react-router-dom"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import pluralize from "pluralize"
import { Card, Badge, Row, Col, Popover, Menu, Button, Empty } from "antd"
import Icon, {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
  GroupOutlined
} from "@ant-design/icons"
import Title from "antd/lib/typography/Title"
import useModal from "../Modal/Hooks/useModal"
import DeletionModal from "../Modal/DeletionModal"
import { removeResource, fetchResources } from "../../actions/resourceActions"
import AddResourceButton from "./AddResourceButton"
import Statistics from "./Statistics"
import IconWrapper from "../Icons/IconWrapper"

const ResourcesList = ({ loaded }) => {
  const location = useLocation()
  const match = useRouteMatch()
  const history = useHistory()
  const dispatch = useDispatch()

  const { showModal, ...deletionModal } = useModal()
  const { resources } = useSelector(
    ({ resources }) => ({ resources }),
    shallowEqual
  )
  const { organizationId } = match.params

  useEffect(() => {
    dispatch(fetchResources(organizationId))
    // eslint-disable-next-line
  }, [organizationId, location, loaded])

  if (resources.length === 0)
    return (
      <Col span={24}>
        <Empty description={"There are no resources created yet."}>
          <AddResourceButton />
        </Empty>
      </Col>
    )
  return (
    <Col span={24} style={{ padding: 0, margin: 0 }}>
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
                    <Icon
                      style={{ verticalAlign: 1, fontSize: "18px" }}
                      component={() => <i className='fal fa-layer-group'></i>}
                    />{" "}
                    {resource.name}
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
                  <Link to={`${match.url}/${resource.formAlias}/settings`}>
                    <SettingOutlined key='setting' />
                  </Link>,
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
                  <NavLink to={`${match.url}/${resource.formAlias}/new`}>
                    <IconWrapper
                      className='fal fa-plus-circle'
                      style={{ fontSize: "24px" }}
                    />
                  </NavLink>
                }>
                <Card.Meta
                  description={<Statistics resource={resource} />}
                  onClick={e => {
                    history.push(`${match.url}/${resource.formAlias}`)
                    e.stopPropagation()
                  }}
                />
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
