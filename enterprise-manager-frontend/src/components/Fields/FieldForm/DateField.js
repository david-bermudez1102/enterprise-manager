import React from "react";
import Icon from "@mdi/react";
import { mdiCalendarRange } from "@mdi/js";

const DateField = ({
  fieldType,
  handleChange,
  handleSelectableChange,
  selectableResourceAttributes
}) => {
  return (
    <div className="col-auto order-first my-auto">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="fieldType"
          id="date_field"
          value="date_field"
          onChange={event => {
            handleChange(event);
            handleSelectableChange(
              {
                ...selectableResourceAttributes,
                _destroy: 1
              },
              []
            );
          }}
          checked={fieldType === "dateField" ? true : false}
        />
        <label htmlFor="date_field" className="form-check-label">
          Date Field
          <Icon
            path={mdiCalendarRange}
            title="Date Field"
            size={1}
            color="#07689F"
          />
        </label>
      </div>
    </div>
  );
};
export default DateField;
