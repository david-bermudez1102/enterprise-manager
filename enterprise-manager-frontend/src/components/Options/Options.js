import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const Options = ({ url, content }) => {
  const location = useLocation();
  return (
    <Tabs type="line" activeKey={location.pathname}>
      <TabPane
        style={{ textAlign: "center" }}
        tab={
          <Link to={`${url}/${content.id}/delete`}>
            <DeleteOutlined />
          </Link>
        }
        key={`${url}/${content.id}/delete`}
      />
      <TabPane
        style={{ textAlign: "center" }}
        tab={
          <Link to={`${url}/${content.id}/edit`}>
            <EditOutlined />
          </Link>
        }
        key={`${url}/${content.id}/edit`}
      />
    </Tabs>
  );
};

export default Options;
