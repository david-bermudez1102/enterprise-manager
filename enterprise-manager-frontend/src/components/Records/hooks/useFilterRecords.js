import { useState } from "react";

export const useFilterRecords = ({ sortedRecords, values }) => {
  const [filteredRecords, setFilteredRecords] = useState(null);

  const filterRecords = (value, recordFieldId) => {
    if (value !== "")
      setFilteredRecords(
        sortedRecords.filter(r =>
          values
            .filter(
              v =>
                v.content.includes(value) && v.recordFieldId === recordFieldId
            )
            .some(v => v.recordId === r.id)
        )
      );
    else setFilteredRecords(null);
  };

  return { filteredRecords, filterRecords };
};
