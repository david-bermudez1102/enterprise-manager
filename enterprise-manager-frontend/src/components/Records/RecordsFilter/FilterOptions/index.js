import React from "react";
import DateRange from "./DateRange";
import { Col, Row } from "antd";
import MonthYear from "./MonthYear";
import DateSelector from "./DateSelector";

const FilterOptions = props => {
  return (
    <Col flex={"auto"}>
      <Row gutter={[16, 16]}>
        <Col>
          <MonthYear {...props} />
        </Col>
        <Col>
          <DateRange {...props} />
        </Col>
        <Col>
          <DateSelector {...props} />
        </Col>
      </Row>
    </Col>
  );
};

export default React.memo(FilterOptions);
