import { useState, useEffect, useRef } from "react";

export const useSelectRecords = ({ sortedRecords, filteredRecords }) => {
  const mounted = useRef();
  const [checked, setChecked] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const selectRecord = record => {
    let newChecked;
    const records = filteredRecords || sortedRecords;
    if (checked.some(r => r === record.id)) {
      newChecked = [...checked.filter(r => r !== record.id)];
    } else newChecked = [...checked, record.id];

    setChecked(newChecked);
    if (
      JSON.stringify(newChecked.sort((a, b) => a - b)) ===
      JSON.stringify(records.map(r => r.id).sort((a, b) => a - b))
    )
      setAllChecked(true);
    else setAllChecked(false);
  };

  const selectAllRecords = records => {
    if (
      JSON.stringify(checked.sort((a, b) => a - b)) ===
      JSON.stringify(records.map(r => r.id).sort((a, b) => a - b))
    ) {
      setChecked([]);
      setAllChecked(false);
    } else {
      setChecked([...records.map(r => r.id)]);
      setAllChecked(true);
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      const records = filteredRecords || sortedRecords;
      const newChecked = [
        ...checked.filter(r => records.some(record => record.id === r))
      ];
      setChecked(newChecked);
      if (
        JSON.stringify(newChecked.sort((a, b) => a - b)) ===
          JSON.stringify(records.map(r => r.id).sort((a, b) => a - b)) &&
        records.length > 0
      )
        setAllChecked(true);
      else setAllChecked(false);
    }
    // eslint-disable-next-line
  }, [filteredRecords]);

  return { selectRecord, selectAllRecords, checked, allChecked };
};
