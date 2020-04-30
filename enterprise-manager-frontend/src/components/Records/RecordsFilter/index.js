import React from "react";
import cuid from "cuid";
import FilterCell from "./FilterCell";

const RecordsFilter = ({ recordFields }) => {
  return (
    <tr>
      <th className="text-truncate"></th>
      <th className="w-auto text-truncate"></th>
      {recordFields.map(recordField => (
        <FilterCell key={cuid()} recordField={recordField} />
      ))}
    </tr>
  );
};
export default RecordsFilter;
