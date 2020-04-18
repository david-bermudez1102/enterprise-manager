import { setSortedRecords } from "../../../actions/recordActions";
import { addInfoAlert } from "../../../actions/alertsActions";

export const sortBy = (
  recordFieldId,
  records,
  values,
  ascendant,
  resource,
  dispatch
) => {
  if (recordFieldId !== 0) {
    const sortedValues = [...values]
      .filter(value => value.recordFieldId === recordFieldId)
      .sort((value, memo) => {
        const valueA = value.content ? value.content.toUpperCase() : ""; // ignore upper and lowercase
        const valueB = memo.content ? memo.content.toUpperCase() : ""; // ignore upper and lowercase
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      });
    if (sortedValues.length > 0) {
      const sortedRecords = records
        .filter(record => record.formId === resource.id)
        .sort((rec, memo) => {
          const x = sortedValues.find(value => value.recordId === rec.id);
          const y = sortedValues.find(value => value.recordId === memo.id);
          const valueA = x && x.content ? x.content.toUpperCase() : ""; // ignore upper and lowercase
          const valueB = y && y.content ? y.content.toUpperCase() : "";
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        });
      dispatch(
        setSortedRecords(
          ascendant ? sortedRecords : sortedRecords.reverse(),
          resource.id
        )
      );
    } else {
      dispatch(
        addInfoAlert([
          "This column has no values. Using default column (#) to sort table."
        ])
      );
    }
  } else {
    dispatch(
      setSortedRecords(
        ascendant ? [...records] : [...records].reverse(),
        resource.id
      )
    );
  }
};
