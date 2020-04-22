import React, { useRef, useEffect } from "react";
import { useState } from "react";
import SelectableInput from "../../SelectableInput";
import cuid from "cuid";
import OptionBadge from "../OptionBadge";
import { useSelector } from "react-redux";

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
  }, [items]);

  return (
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
          <div className="form-group mb-0">
            <SelectableInput
              name="combineWith"
              id="combine_with"
              key={key}
              fieldRef={fieldRef}
              className="form-control"
              options={availableFields}
              onChange={handleFieldChange}
              placeholder="Select fields to combine"
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
    </div>
  );
};
export default CombineWith;
