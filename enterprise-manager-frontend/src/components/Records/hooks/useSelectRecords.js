import { useState } from "react";

export const useSelectRecords = ({ sortedRecords }) => {
  const [checked, setChecked] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const selectRecord = record => {
    let newChecked;
    if (checked.some(r => r === record.id)) {
      newChecked = [...checked.filter(r => r !== record.id)];
    } else newChecked = [...checked, record.id];

    setChecked(newChecked);
    if (
      JSON.stringify(newChecked.sort((a, b) => a - b)) ===
      JSON.stringify(sortedRecords.map(r => r.id).sort((a, b) => a - b))
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

  return { selectRecord, selectAllRecords, checked, allChecked };
};
