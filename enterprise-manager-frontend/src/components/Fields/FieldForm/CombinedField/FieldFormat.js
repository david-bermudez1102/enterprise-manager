import React from "react";

const FieldFormat = ({ items }) => {
  const itemsValues = items.map(item => item.value);
  const allSpaced = itemsValues.join(" ");
  const withUnderscore = itemsValues.join("_").replace(/[ ]+/g, "_");
  const withDashes = itemsValues.join("-").replace(/[ ]+/g, "-");

  const formatOptions = [
    {
      value: "allUnderscore",
      label: withUnderscore,
      helper: "All values separated with underscore"
    },
    {
      value: "allDashes",
      label: withDashes,
      helper: "All values separated with dashes"
    },
    {
      value: "dashesUpperCase",
      label: withDashes.toUpperCase(),
      helper: "All values separated with dashes and upper case"
    },
    {
      value: "underscoreUpperCase",
      label: withUnderscore.toUpperCase(),
      helper: "All values separated with underscore and upper case"
    },
    {
      value: "dashesLowerCase",
      label: withDashes.toLowerCase(),
      helper: "All values separated with dashes and lower case"
    },
    {
      value: "underscoreLowerCase",
      label: withUnderscore.toLowerCase(),
      helper: "All values separated with underscore and lower case"
    },
    {
      value: "allSpacedUpperCase",
      label: allSpaced.toUpperCase(),
      helper: "All values separated with a spaces and upper case"
    },
    {
      value: "allSpacedLower",
      label: allSpaced.toLowerCase(),
      helper: "All values separated with spaces and lower case"
    },
    {
      value: "noFormat",
      label: allSpaced,
      helper: "No formatting. All values are saved separated by space only"
    }
  ];

  return (
    <>
      <hr />
      <div className="form-group mb-0 w-100">
        <legend>Choose Format:</legend>
        {formatOptions.map(o => (
          <div className="form-check w-100">
            <input
              className="form-check-input"
              type="radio"
              value={o.value}
              id={o.value}
            />
            <label
              className="form-check-label d-inline-block text-nowrap"
              htmlFor={o.value}
              style={{ maxWidth: "100%" }}>
              <div className="d-inline-block w-auto text-nowrap float-left">
                {o.helper}
              </div>
              <div className="d-block text-muted pl-1 small text-truncate">
                ({o.label})
              </div>
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FieldFormat;
