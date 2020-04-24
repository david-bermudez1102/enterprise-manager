import React, { useState } from "react";
import cuid from "cuid";

const FieldFormat = ({ items, handleChange }) => {
  const itemsValues = items.map(item => item.value);
  const allSpaced = itemsValues.join(" ");
  const withUnderscore = itemsValues.join("_").replace(/[ ]+/g, "_");
  const withDashes = itemsValues.join("-").replace(/[ ]+/g, "-");

  const formatOptions = [
    {
      value: "all_underscored",
      label: withUnderscore,
      helper: "All values separated with underscore"
    },
    {
      value: "all_dashed",
      label: withDashes,
      helper: "All values separated with dashes"
    },
    {
      value: "dashed_upper",
      label: withDashes.toUpperCase(),
      helper: "All values separated with dashes and upper case"
    },
    {
      value: "underscored_upper",
      label: withUnderscore.toUpperCase(),
      helper: "All values separated with underscore and upper case"
    },
    {
      value: "dashed_lower",
      label: withDashes.toLowerCase(),
      helper: "All values separated with dashes and lower case"
    },
    {
      value: "underscored_lower",
      label: withUnderscore.toLowerCase(),
      helper: "All values separated with underscore and lower case"
    },
    {
      value: "all_spaced_upper",
      label: allSpaced.toUpperCase(),
      helper: "All values separated with a spaces and upper case"
    },
    {
      value: "all_spaced_lower",
      label: allSpaced.toLowerCase(),
      helper: "All values separated with spaces and lower case"
    },
    {
      value: "no_format",
      label: allSpaced,
      helper: "No formatting. All values are saved separated by space only"
    }
  ];
  const [formatSelected, setFormatSelected] = useState("no_format");

  const handleClick = state => {
    setFormatSelected(state.fieldFormat);
    handleChange(state);
  };

  return (
    <>
      <hr />
      <div className="form-group mb-0 w-1000" tabIndex={0}>
        <legend className="col-form-label">Choose Format:</legend>
        <div
          className="list-group list-group-flush w-100 scroller"
          style={{ maxHeight: "100px" }}>
          {formatOptions.map(o => (
            <div
              key={cuid()}
              style={{ cursor: "pointer" }}
              className={`w-100 list-group-item list-group-item-action py-1.5 px-2 ${
                formatSelected === o.value ? "active" : ""
              }`}
              onClick={() => handleClick({ fieldFormat: o.value })}>
              <div
                className="d-block w-auto small float-left text-truncate"
                style={{ maxWidth: "50%" }}
                title={o.label}>
                {o.label}
              </div>
              <div className="pl-1 d-block text-truncate" title={o.helper}>
                ({o.helper})
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FieldFormat;
