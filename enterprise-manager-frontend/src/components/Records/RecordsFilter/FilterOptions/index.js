import React from "react";
import DateRange from "./DateRange";
import { Col } from "antd";

const FilterOptions = () => {
  return (
    <Col flex={"auto"}>
      <DateRange />
    </Col>
  );
};

export default FilterOptions;
