import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { List, Card } from "antd";
import Title from "antd/lib/typography/Title";
import Statistics from "../../Resources/Statistics";

const RecordsResourcesList = () => {
  const match = useRouteMatch();
  const { resources } = useSelector(
    ({ resources }) => ({ resources }),
    shallowEqual
  );

  console.log(match);
  return (
    <List
      grid={{
        gutter: 16,
        sm: 1,
        md: 2,
        xl: 3,
        xxl: 3,
      }}
      dataSource={resources}
      itemLayout={"horizontal"}
      renderItem={resource => (
        <List.Item>
          <NavLink to={`${match.url}/${resource.formAlias}`}>
            <Card hoverable>
              <Card.Meta
                title={<Title level={2}>{resource.name}</Title>}
                description={<Statistics resource={resource} />}
              />
            </Card>
          </NavLink>
        </List.Item>
      )}></List>
  );
};

export default RecordsResourcesList;
