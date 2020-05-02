import workerInstance from "../../../workers/workerActions";
import {
  setRecordsSortedBy,
  setSortedRecords,
} from "../../../actions/recordActions";
import { addInfoAlert } from "../../../actions/alertsActions";

const recordsSort = (
  recordFieldId,
  orders,
  resource,
  records,
  values,
  dispatch
) => {
  workerInstance
    .handleSortBy(recordFieldId, orders, resource, records, values)
    .then(({ id, recordFieldId, sortedRecords, message }) => {
      dispatch(setRecordsSortedBy({ id, recordFieldId, orders }));
      if (sortedRecords) dispatch(setSortedRecords(sortedRecords, resource.id));
      if (message) dispatch(addInfoAlert([message]));
    });
};

export default recordsSort;
