import React from "react";
import cuid from "cuid";
import RecordCell from "./RecordCell";
import RecordOptions from "./RecordOptions";

const Record = ({
  record,
  recordFields,
  values,
  resourceId,
  checked,
  selectRecord
}) => {
  return (
    <tr>
      <th className="w-auto text-truncate" style={{ maxWidth: "30px" }}>
        {record.listingId}
      </th>
      <th className="w-auto text-truncate" style={{ maxWidth: "30px" }}>
        <RecordOptions
          record={record}
          checked={checked}
          selectRecord={selectRecord}
        />
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
