import React, { useState, useCallback } from "react";
import InputGroup from "../../InputGroup";

const FilterCell = props => {
  const [value, setValue] = useState("");
  const handleChange = e => {
    e.persist();
    setValue(e.target.value);
    props.filterRecords(e.target.value, props.recordField.id);
  };
  console.log(value);

  return (
    <td
      className="text-nowrap"
      style={{
        color: "#3c4858",
        fontSize: "15px",
        verticalAlign: "middle"
      }}>
      <div className="position-relative w-100 d-flex flex-nowrap align-items-center">
        <InputGroup>
          <i className="fas fa-filter"></i>
          <input
            type="text"
            id={`filter_field_${props.recordField.id}`}
            className="form-control form-control-sm border-top-0 border-left-0 border-right-0 shadow-none bg-transparent"
            onChange={handleChange}
            style={{ zIndex: 1, borderRadius: 0 }}
            value={value}
          />
        </InputGroup>
      </div>
    </td>
  );
};

export default FilterCell;
