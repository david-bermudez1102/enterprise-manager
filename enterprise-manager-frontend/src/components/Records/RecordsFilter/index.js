import React from "react";
import FilterCell from "./FilterCell";

const RecordsFilter = ({ recordFields, filterRecords }) => {
  return (
    <tr>
      <th className="text-truncate bg-white"></th>
      <th className="w-auto text-truncate bg-white"></th>
      {recordFields.map((recordField) => (
        <FilterCell
          key={`recordField_${recordField.id}`}
          recordField={recordField}
          filterRecords={filterRecords}
        />
      ))}
    </tr>
  );
};
export default React.memo(RecordsFilter);
