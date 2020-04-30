import React from "react";
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
      <th className="text-truncate">
        <RecordOptions
          record={record}
          checked={checked}
          selectRecord={selectRecord}
        />
      </th>
      <th className="w-auto text-truncate" style={{ maxWidth: "30px" }}>
        {record.listingId}
      </th>
      {recordFields
        .filter(recordField => recordField.formId === resourceId)
        .map(recordField => (
          <RecordCell
            key={`record_cell_${recordField.id}`}
            recordField={recordField}
            values={values}
            record={record}
          />
        ))}
    </tr>
  );
};
export default React.memo(Record);
