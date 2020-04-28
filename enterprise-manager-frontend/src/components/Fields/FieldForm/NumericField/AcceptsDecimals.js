import React, { useEffect } from "react";
import { useState } from "react";

const AcceptsDecimals = ({ handleChange, fieldType }) => {
  const [acceptsDecimals, setAcceptsDecimals] = useState(false);

  const handleCheckBoxChange = e => {
    setAcceptsDecimals(e.target.checked);
    handleChange({ acceptsDecimals: e.target.checked });
  };

  return fieldType === "numeric_field" ? (
    <div className="col-12 order-last">
      <hr />
      <div className="form-check form-check-inline">
        <input
          type="checkbox"
          name="acceptsDecimals"
          className="form-check-input"
          onChange={handleCheckBoxChange}
          value={acceptsDecimals}
        />
        <label className="form-check-label" htmlFor="acceptsDecimals">
          Accepts Decimals
        </label>
      </div>
    </div>
  ) : null;
};
export default AcceptsDecimals;
