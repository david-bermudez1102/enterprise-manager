import workerInstance from "../../../workers/workerActions";
import {
  setRecordsSortedBy,
  setSortedRecords,
} from "../../../actions/recordActions";

const recordsSort = async (
  recordFieldId,
  order,
  resource,
  values,
  dispatch
) => {
  return await workerInstance
    .handleSortBy(recordFieldId, order, resource, values)
    .then(({ id, recordFieldId, sortedRecords }) => {
      dispatch(setRecordsSortedBy({ id, recordFieldId, order }));
      if (sortedRecords) dispatch(setSortedRecords(sortedRecords, resource.id));
    });
};

export default recordsSort;
