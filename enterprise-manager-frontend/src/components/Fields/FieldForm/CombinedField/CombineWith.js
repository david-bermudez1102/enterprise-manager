import React, { useRef, useEffect } from "react";
import { useState } from "react";
import SelectableInput from "../../SelectableInput";
import cuid from "cuid";
import OptionBadge from "../OptionBadge";
import { useSelector } from "react-redux";
import Portal from "../../../Portal/Portal";
import FieldFormat from "./FieldFormat";

const CombineWith = ({ resourceId, handleChange, fieldType }) => {
  const fieldRef = useRef();
  const [items, setItems] = useState([]);
  const [key, setKey] = useState(cuid());

  const availableFields = useSelector(state =>
    state.fields
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
    setKey(cuid());
    if (fieldType === "combined_field")
      handleChange({ combinedFields: items.map(i => i.id) });
    else handleChange({ combinedFields: undefined });
  }, [items, fieldType, handleChange]);

  console.log(items);

  return fieldType === "combined_field" ? (
    <div className="col-12 order-last">
      {items.length > 0 ? (
        <div>
          <hr />
          {items.map(item => (
            <OptionBadge
              key={cuid()}
              value={item.value}
              onClick={() => removeItem(item.id)}
            />
          ))}
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
              fieldRef={fieldRef}
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
        </>
      ) : null}
      <FieldFormat items={items} />
    </div>
  ) : null;
};
export default CombineWith;
