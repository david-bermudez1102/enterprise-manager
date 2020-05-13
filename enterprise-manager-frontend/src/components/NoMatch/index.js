import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";

const NoMatch = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="We're sorry. It appears the page you were looking for doesn't exist or
          has been removed."
      extra={
        <Link to={"/"}>
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default NoMatch;
