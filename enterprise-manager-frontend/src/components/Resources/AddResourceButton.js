import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddResourceButton = () => {
  const match = useRouteMatch();
  return (
    <Link to={`${match.url}/new`}>
      <Button
        title="Add new resource"
        type={"dashed"}
        style={{ height: "100%", background: "transparent" }}
        block>
        <PlusOutlined size={"large"} style={{ fontSize: "50px" }} />
      </Button>
    </Link>
  );
};

export default AddResourceButton;
