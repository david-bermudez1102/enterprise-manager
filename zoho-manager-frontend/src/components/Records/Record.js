import React from "react";
import cuid from "cuid";

const Record = ({ record, recordFields, values, resourceId }) => {
  return (
    <tr key={cuid()}>
      {recordFields
        .filter(recordField => recordField.formId === resourceId)
        .map(recordField => (
          <td key={cuid()}>
            {values
              .filter(
                value =>
                  value.recordFieldId === recordField.id &&
                  value.recordId === record.id
              )
              .map(value => value.content)}
          </td>
        ))}
    </tr>
  );
};
export default Record;
