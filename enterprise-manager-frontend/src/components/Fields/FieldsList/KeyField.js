import React from "react";

const KeyField = props => {
  return (
    <input
      {...props}
      type="number"
      step={props.field.acceptsDecimals ? "any" : undefined}
      onInvalid={e => (e.target.value = "")}
      onBlur={e => e.target.checkValidity()}
    />
  );
};

export default KeyField;
