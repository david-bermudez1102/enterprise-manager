import React, { useEffect } from "react";
import { useState } from "react";

const AcceptsDecimals = ({ handleChange, fieldType }) => {
  const [acceptsDecimals, setAcceptsDecimals] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [evt, setEvt] = useState(null);

  const handleCheckBoxChange = e => {
    e.persist();
    setAcceptsDecimals(e.target.checked);
    setEvt(e);
  };

  useEffect(() => {
    if (fieldType === "numeric_field") setAcceptsDecimals(false);
    else {
      setAcceptsDecimals();
    }
  }, [fieldType]);

  useEffect(() => {
    if (evt) handleChange(evt);
  }, [acceptsDecimals, handleChange, evt]);

  useEffect(() => {
    if (acceptsDecimals === undefined) setHidden(true);
    else setHidden(false);
  }, [acceptsDecimals]);

  return !hidden ? (
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
