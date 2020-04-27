import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import cuid from "cuid";
import SelectableResourcesOptions from "./SelectableResourcesOptions";

const SelectableResources = props => {
  const { field, resources, fields, handleSelectable } = props;
  const { selectableResourceAttributes } = field;
  const formId = selectableResourceAttributes
    ? selectableResourceAttributes.formId
    : null;
  const mounted = useRef();

  const [selected, setSelected] = useState(formId || "");
  const [state, setState] = useState(selectableResourceAttributes || {});

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      handleSelectable({ selectableResourceAttributes: state });
      setSelected(state.formId || selected);
    }
  }, [state]);

  return (
    <>
      <div className="form-group mb-0">
        <hr />
        <select
          name="formId"
          id="selectable_resource"
          onChange={handleChange}
          value={selected}
          className="form-control">
          <option value="" key={cuid()}>
            Select
          </option>
          {resources.map(resource => (
            <option value={resource.id} key={cuid()}>
              {resource.name}
            </option>
          ))}
        </select>
        <label
          className="form-control-placeholder"
          htmlFor="selectable_resource">
          Connect to
        </label>
      </div>
      <SelectableResourcesOptions
        resourceFieldId={
          selectableResourceAttributes
            ? selectableResourceAttributes.resourceFieldId || ""
            : ""
        }
        fields={fields}
        selected={selected}
        handleChange={handleChange}
      />
    </>
  );
};

const mapStateToProps = ({ resources, fields }) => {
  return { resources, fields };
};

export default connect(mapStateToProps)(SelectableResources);
