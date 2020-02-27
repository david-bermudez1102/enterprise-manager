import React from "react";
import cuid from "cuid";

const Record = ({ record, fields, values }) => {
  return (
    <tr>
      {fields.map(field => (
        <td key={cuid()}>
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
