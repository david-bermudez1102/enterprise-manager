import React from "react";
import cuid from "cuid";

const Record = ({ records, record, recordFields, values, resourceId }) => {
  return (
    <tr>
      <th>
        {records
          .filter(record => record.formId === resourceId)
          .indexOf(record) + 1}
      </th>
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
