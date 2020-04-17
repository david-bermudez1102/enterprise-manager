import React, { Component } from "react";
import { connect } from "react-redux";
import SelectableOptions from "./SelectableOptions";
import Icon from "@mdi/react";
import { mdiCheckboxMultipleMarkedOutline } from "@mdi/js";

class CheckBoxField extends Component {
  handleChange = event => {
    const {
      handleChange,
      handleSelectableChange,
      selectableResourceAttributes
    } = this.props;
    handleChange(event);
    handleSelectableChange(
      {
        ...selectableResourceAttributes,
        _destroy: 1
      },
      []
    );
    this.props.handleKeyFieldChange({ resource_field_id: "" });
  };

  render() {
    const {
      field,
      handleSelectableChange,
      selectableResourceAttributes,
      fieldType
    } = this.props;
    return (
      <>
        <div className="col-auto order-first my-auto">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="fieldType"
              id="checkbox_field"
              value="checkbox"
              onChange={this.handleChange}
              checked={fieldType === "checkbox" ? true : false}
            />
            <label htmlFor="checkbox_field" className="form-check-label">
              Checkbox Set{" "}
              <Icon
                path={mdiCheckboxMultipleMarkedOutline}
                title="Checkbox Field"
                size={1}
                color="#07689F"
              />
            </label>
          </div>
        </div>
        {fieldType === "checkbox" ? (
          <div className="col-12 order-last my-auto">
            <SelectableOptions
              field={field}
              fieldType={fieldType}
              handleSelectableChange={handleSelectableChange}
              selectableResourceAttributes={selectableResourceAttributes}
            />
          </div>
        ) : null}
      </>
    );
  }
}
const mapStateToProps = ({ fields }) => {
  return { fields };
};

export default connect(mapStateToProps)(CheckBoxField);
