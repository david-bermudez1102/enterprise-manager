import React from "react";

const Record = ({ record, fields, values }) => {
  return (
    <tr>
      {fields.map(field => (
        <td key={`field_value_${field.id}_${record.id}`}>
          {values
            .filter(
              value =>
                value.fieldId === field.id && value.recordId === record.id
            )
            .map(value => value.content)}
        </td>
      ))}
    </tr>
  );
};
export default Record;
