import { useState, useCallback } from "react";

export const useFilterRecords = ({ sortedRecords }) => {
  const [filteredRecords, setFilteredRecords] = useState(null);

  const filterRecords = useCallback(
    filters => {
      const filtersKeys = Object.keys(filters).filter(f => filters[f]); //Remove any null keys
      if (filtersKeys.length > 0)
        setFilteredRecords(
          sortedRecords.filter(record =>
            filtersKeys.every(f =>
              filters[f].some(value => record[f] === value)
            )
          )
        );
      else setFilteredRecords(null);
    },
    [sortedRecords]
  );

  return { filteredRecords, filterRecords };
};
