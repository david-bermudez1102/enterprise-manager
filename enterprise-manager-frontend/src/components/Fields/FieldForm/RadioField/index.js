import React from "react";
import { connect } from "react-redux";
import Icon from "@mdi/react";
import { mdiCheckboxMultipleMarkedCircleOutline } from "@mdi/js";
import SelectableOptions from "../SelectableField/SelectableOptions";
import { useHandleChange } from "../../Hooks/useHandleChange";

const RadioField = props => {
  const { field, fieldType, onChange } = props;
  const { handleChange, handleSelectable } = useHandleChange({
    field,
    onChange
  });

  return (
    <>
      <div className="col-auto order-first my-auto">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="fieldType"
            id="radio_field"
            value="radio"
            onChange={handleChange}
            checked={fieldType === "radio" ? true : false}
          />
          <label htmlFor="radio_field" className="form-check-label">
            Radio Field
            <Icon
              path={mdiCheckboxMultipleMarkedCircleOutline}
              title="Radio Field"
              size={1}
              color="#07689F"
            />
          </label>
        </div>
      </div>
      {fieldType === "radio" ? (
        <div className="col-12 order-last my-auto">
          <SelectableOptions
            field={field}
            fieldType={fieldType}
            handleSelectable={handleSelectable}
            handleChange={handleChange}
          />
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ fields }) => {
  return { fields };
};

export default connect(mapStateToProps)(RadioField);
