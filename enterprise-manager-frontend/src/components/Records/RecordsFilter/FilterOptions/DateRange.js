import React from "react";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const dateFormat = "MM/DD/YYYY";

const DateRange = () => {
  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = value => {
    console.log("onOk: ", value);
  };
  return <RangePicker format={dateFormat} onChange={onChange} onOk={onOk} />;
};

export default DateRange;
