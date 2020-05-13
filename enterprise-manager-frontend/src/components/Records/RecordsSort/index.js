import workerInstance from "../../../workers/workerActions";
import {
  setRecordsSortedBy,
  setSortedRecords,
} from "../../../actions/recordActions";

const recordsSort = (recordFieldId, order, resource, values, dispatch) => {
  workerInstance
    .handleSortBy(recordFieldId, order, resource, values)
    .then(({ id, recordFieldId, sortedRecords }) => {
      dispatch(setRecordsSortedBy({ id, recordFieldId, order }));
      if (sortedRecords) dispatch(setSortedRecords(sortedRecords, resource.id));
    });
};

export default recordsSort;
