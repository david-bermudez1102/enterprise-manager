export const sortBy = (recordFieldId, records, values, ascendant, resource) => {
  if (recordFieldId !== 0) {
    const sortedValues = [...values]
      .filter((value) => value.recordFieldId === recordFieldId)
      .sort((value, memo) => {
        const valueA = value.content ? value.content.toUpperCase() : ""; // ignore upper and lowercase
        const valueB = memo.content ? memo.content.toUpperCase() : ""; // ignore upper and lowercase
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      });
    if (sortedValues.length > 0) {
      let sortedRecords = records
        .filter((record) => record.formId === resource.id)
        .sort((rec, memo) => {
          const x = sortedValues.find((value) => value.recordId === rec.id);
          const y = sortedValues.find((value) => value.recordId === memo.id);
          const valueA = x && x.content ? x.content.toUpperCase() : ""; // ignore upper and lowercase
          const valueB = y && y.content ? y.content.toUpperCase() : "";
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        });
      sortedRecords = ascendant ? sortedRecords : sortedRecords.reverse();
      return { sortedRecords };
    } else {
      return {
        message:
          "This column has no values. Using default column (#) to sort table.",
      };
    }
  } else {
    let sortedRecords = ascendant ? [...records] : [...records].reverse();
    return { sortedRecords };
  }
};
