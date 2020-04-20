import React from "react";

const NumericFieldOptions = ({ fieldType }) => {
  return fieldType === "numeric_field" ? (
    <div className="col-12 order-last">
      <hr />
      <div className="form-check form-check-inline">
        <input
          type="checkbox"
          name="acceptsDecimals"
          className="form-check-input"
        />
        <label className="form-check-label" htmlFor="acceptsDecimals">
          Accepts Decimals
        </label>
      </div>
    </div>
  ) : null;
};
export default NumericFieldOptions;
