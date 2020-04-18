import React from "react";
import cuid from "cuid";
import RecordCell from "./RecordCell";

const Record = ({ record, recordFields, values, resourceId }) => {
  return (
    <tr>
      <th className="w-auto text-truncate" style={{ maxWidth: "30px" }}>
        {record.listingId}
      </th>
      {recordFields
        .filter(recordField => recordField.formId === resourceId)
        .map(recordField => (
          <RecordCell
            key={cuid()}
            recordField={recordField}
            values={values}
            record={record}
          />
        ))}
    </tr>
  );
};
export default Record;
