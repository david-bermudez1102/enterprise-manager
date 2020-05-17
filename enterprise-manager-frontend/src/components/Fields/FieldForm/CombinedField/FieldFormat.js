import React from "react";
import { Divider, Select, Tooltip, Button, Form } from "antd";

const FieldFormat = ({ items, handleChange, fieldFormat }) => {
  const itemsValues = items.map(item => item.value);
  const allSpaced = itemsValues.join(" ");
  const withUnderscore = itemsValues.join("_").replace(/[ ]+/g, "_");
  const withDashes = itemsValues.join("-").replace(/[ ]+/g, "-");

  const formatOptions = [
    {
      value: "all_underscored",
      label: withUnderscore,
      title: "All values separated with underscore",
    },
    {
      value: "all_dashed",
      label: withDashes,
      title: "All values separated with dashes",
    },
    {
      value: "dashed_upper",
      label: withDashes.toUpperCase(),
      title: "All values separated with dashes and upper case",
    },
    {
      value: "underscored_upper",
      label: withUnderscore.toUpperCase(),
      title: "All values separated with underscore and upper case",
    },
    {
      value: "dashed_lower",
      label: withDashes.toLowerCase(),
      title: "All values separated with dashes and lower case",
    },
    {
      value: "underscored_lower",
      label: withUnderscore.toLowerCase(),
      title: "All values separated with underscore and lower case",
    },
    {
      value: "all_spaced_upper",
      label: allSpaced.toUpperCase(),
      title: "All values separated with a spaces and upper case",
    },
    {
      value: "all_spaced_lower",
      label: allSpaced.toLowerCase(),
      title: "All values separated with spaces and lower case",
    },
    {
      value: "no_format",
      label: allSpaced,
      title: "No formatting. All values are saved separated by space only",
    },
  ];

  const onChange = (value, option) => {
    handleChange({ fieldFormat: value });
  };

  return (
    <>
      <Divider />
      <Form.Item label="Format" required>
        <Select placeholder="Select format" onChange={onChange}>
          {formatOptions.map((option, id) => (
            <Select.Option key={`format_option_${id}`} value={option.value}>
              <Tooltip title={option.title} placement={"right"}>
                <Button
                  type="primary"
                  ghost
                  block
                  style={{ border: 0, textAlign: "left" }}>
                  {option.label}
                </Button>
              </Tooltip>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default FieldFormat;
