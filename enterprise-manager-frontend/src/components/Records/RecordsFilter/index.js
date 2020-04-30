import React from "react";
import FilterCell from "./FilterCell";

const RecordsFilter = ({ recordFields, filterRecords }) => {
  return (
    <tr>
      <th className="text-truncate"></th>
      <th className="w-auto text-truncate"></th>
      {recordFields.map(recordField => (
        <FilterCell
          key={`recordField_${recordField.id}`}
          recordField={recordField}
          filterRecords={filterRecords}
        />
      ))}
    </tr>
  );
};
export default RecordsFilter;
