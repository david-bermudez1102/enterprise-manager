import React, { useEffect, useState, useRef } from "react";
import SelectableInput from "../../SelectableInput";
import cuid from "cuid";
import OptionBadge from "../OptionBadge";
import { useSelector } from "react-redux";
import Portal from "../../../Portal/Portal";
import FieldFormat from "./FieldFormat";
import DraggableOption from "../OptionBadge/DraggableOption";

const CombineWith = ({
  resourceId,
  handleChange,
  fieldType,
  initialState,
  fieldFormat
}) => {
  const mounted = useRef();

  const [items, setItems] = useState(initialState || []);
  const [key, setKey] = useState(cuid());

  const availableFields = useSelector(state =>
    state.recordFields
      .filter(
        field =>
          field.formId === resourceId &&
          !items.some(item => item.id === field.id)
      )
      .map(field => ({ id: field.id, value: field.name }))
  );

  const handleFieldChange = item => {
    if (!items.some(i => i.id === item.id) && item !== "")
      setItems([...items, item]);
  };

  const removeItem = id => {
    setItems(items.filter(item => item.id !== id));
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setKey(cuid());
      if (fieldType === "combined_field" && items.length > 0)
        handleChange({ combinedFields: items.map(i => i.id) });
    }
  }, [items, fieldType, handleChange]);

  const handleSwapOptions = options => {
    setItems(options.map(option => items[option]));
  };

  return fieldType === "combined_field" ? (
    <div className="col-12 order-last">
      {items.length > 0 ? (
        <div>
          <hr />
          <small className="form-text pb-2">Fields to combine:</small>
          <DraggableOption items={items} onDragEnd={handleSwapOptions}>
            {items.map(item => (
              <OptionBadge
                key={cuid()}
                value={item.value}
                handleClose={() => removeItem(item.id)}
              />
            ))}
          </DraggableOption>
          <small className="form-text text-muted">
            You can rearrange the order in which the fields will be combined by
            dragging them to the desired position.
          </small>
        </div>
      ) : null}
      {availableFields.length > 0 ? (
        <>
          <hr />
          <Portal>
            <form
              id="combineWith"
              noValidate
              onSubmit={e => e.preventDefault()}></form>
          </Portal>
          <div className="form-group mb-0">
            <SelectableInput
              name="combineWith"
              id="combine_with"
              form={items.length > 1 ? "combineWith" : undefined}
              key={key}
              className="form-control"
              options={availableFields}
              onChange={handleFieldChange}
              placeholder="Select fields to combine"
              autoFocus
              required>
              <label
                className="form-control-placeholder"
                htmlFor="combine_with">
                Select fields
              </label>
            </SelectableInput>
          </div>
          <small className="form-text text-muted">
            Combined fields require at least 2 fields
          </small>
        </>
      ) : null}
      {items.length > 1 ? (
        <FieldFormat
          fieldFormat={fieldFormat}
          items={items}
          handleChange={handleChange}
          fieldType={fieldType}
        />
      ) : null}
    </div>
  ) : null;
};
export default CombineWith;
