import React from "react";
import { DatePicker } from "antd";
import { useHistory, useLocation } from "react-router-dom";

const DateSelector = () => {
  const location = useLocation();
  const history = useHistory();

  const onChange = (value, dateString) => {
    history.push({
      path: `${location.pathname}`,
      search: `${location.search.split("&")[0]}&date=${dateString}`,
    });
  };

  const onOk = value => {
    console.log("onOk: ", value);
  };

  return <DatePicker format={"MM/DD/YYYY"} onChange={onChange} onOk={onOk} />;
};

export default DateSelector;
