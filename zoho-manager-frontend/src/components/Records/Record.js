import React from "react";
import cuid from "cuid";

const Record = ({ record, recordFields, values }) => {
  return (
    <tr key={cuid()}>
      {recordFields.map(recordField => (
        <td key={cuid()}>
          {values
            .filter(
              value =>
                value.recordFieldId === recordField.id && value.recordId === record.id
            )
            .map(value => value.content)}
        </td>
      ))}
    </tr>
  );
};
export default Record;
