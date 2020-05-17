import React, { useEffect, useState, useRef } from "react";
import cuid from "cuid";
import OptionBadge from "../OptionBadge";
import { useSelector, shallowEqual } from "react-redux";
import FieldFormat from "./FieldFormat";
import DraggableOption from "../OptionBadge/DraggableOption";
import { Col, Divider, Select, Form, Row } from "antd";

const CombineWith = ({
  resourceId,
  handleChange,
  fieldType,
  initialState,
  fieldFormat,
}) => {
  const mounted = useRef();

  const [items, setItems] = useState(initialState || []);
  const [key, setKey] = useState(cuid());

  const availableFields = useSelector(
    state =>
      (state.recordFields[resourceId] || [])
        .filter(field => !items.some(item => item.id === field.id))
        .map(field => ({ id: field.id, value: field.name })),
    shallowEqual
  );

  const handleFieldChange = (value, item) => {
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
    <Col span={24} order={24}>
      {items.length > 0 ? (
        <Row>
          <Divider />
          <Col span={24} style={{ marginBottom: "8px" }}>
            <small>Fields to combine:</small>
          </Col>
          <Col span={24}>
            <DraggableOption items={items} onDragEnd={handleSwapOptions}>
              {items.map(item => (
                <OptionBadge
                  color="cyan"
                  key={`combined_field_option_${item.id}`}
                  value={item.value}
                  handleClose={() => removeItem(item.id)}
                />
              ))}
            </DraggableOption>
          </Col>
          <Col style={{ marginTop: "8px" }}>
            <small className="form-text text-muted">
              You can rearrange the order in which the fields will be combined
              by dragging them to the desired position.
            </small>
          </Col>
        </Row>
      ) : null}
      {availableFields.length > 0 ? (
        <>
          <Divider />
          <Form.Item label="Select fields">
            <Select
              showSearch
              name="combineWith"
              id="combine_with"
              key={key}
              options={availableFields}
              onChange={handleFieldChange}
              placeholder="Select fields to combine"
              autoFocus
              required
            />
          </Form.Item>
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
    </Col>
  ) : null;
};
export default CombineWith;
