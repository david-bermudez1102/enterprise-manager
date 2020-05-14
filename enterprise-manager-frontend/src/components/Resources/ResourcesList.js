import React, { useEffect } from "react";
import {
  NavLink,
  matchPath,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { NoContent } from "../NoContent";
import { useSelector, shallowEqual } from "react-redux";
import Loader from "../Loader";
import pluralize from "pluralize";
import {
  Card,
  Badge,
  Avatar,
  Row,
  Col,
  Statistic,
  Popover,
  Menu,
  Button,
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  LayoutFilled,
  DeleteOutlined,
  GroupOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import Title from "antd/lib/typography/Title";
import useModal from "../Modal/Hooks/useModal";
import DeletionModal from "../Modal/DeletionModal";
import { removeResource } from "../../actions/resourceActions";

const ResourcesList = ({ loaded, loading }) => {
  const location = useLocation();
  const match = useRouteMatch();
  const history = useHistory();
  const { showModal, ...deletionModal } = useModal();
  const { resources } = useSelector(
    ({ resources }) => ({ resources }),
    shallowEqual
  );

  useEffect(() => {
    if (
      resources.length === 0 &&
      location.pathname !== `${match.url}/new` &&
      loaded
    ) {
      history.push(`${match.url}/new`);
    }
    // eslint-disable-next-line
  }, [resources, location, loaded]);

  if (resources.length === 0)
    return (
      <NoContent>
        <i className="fas fa-exclamation-circle mr-2"></i>
        There are no resources created yet!
      </NoContent>
    );
  return (
    <>
      {resources.map(resource => {
        const isActive = !!matchPath(
          location.pathname,
          `/organizations/:organizationId/resources/${resource.formAlias}`
        );
        return (
          <Card
            activeTabKey={location.pathname}
            key={`resource_card_${resource.id}`}
            style={{ width: "100%" }}
            title={
              <Title level={3} style={{ marginBottom: 0 }}>
                <i className="fas fa-layer-group"></i> {resource.name}
              </Title>
            }
            actions={[
              <NavLink to={`${match.url}/${resource.formAlias}/records`}>
                <Badge count={1000} overflowCount={999} offset={[10, -3]}>
                  <GroupOutlined />
                </Badge>
              </NavLink>,
              <SettingOutlined key="setting" />,
              <NavLink to={`${match.url}/${resource.formAlias}/edit`}>
                <EditOutlined key={`${match.url}/${resource.formAlias}/edit`} />
              </NavLink>,
              <Popover
                content={
                  <Menu mode="vertical">
                    <Menu.Item key="1" title={"Delete resource"}>
                      <Button
                        type="link"
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
                            ),
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
                title="More Options"
                style={{ position: "relative", zIndex: 1 }}
                trigger={["click"]}>
                <EllipsisOutlined key="ellipsis" />
              </Popover>,
            ]}
            size={"small"}
            extra={
              <NavLink to={`${match.url}/${resource.formAlias}`}>
                <i
                  className="fad fa-plus-circle"
                  style={{ fontSize: "24px" }}></i>
              </NavLink>
            }>
            <Meta
              description={
                <Row justify="space-around" gutter={[16, 16]}>
                  <Col span={4}>
                    <Statistic
                      title={`Total ${pluralize(resource.name)}`}
                      value={resource.recordsCount}
                    />
                  </Col>
                  <Col span={4}>
                    <Statistic
                      title={"This month"}
                      value={resource.recordsCount}
                    />
                  </Col>
                  <Col span={4}>
                    <Statistic title="Unmerged" value={93} suffix="/ 100" />
                  </Col>
                </Row>
              }
            />
          </Card>
        );
      })}
      <DeletionModal {...deletionModal} />
    </>
  );
};

export default React.memo(ResourcesList);
