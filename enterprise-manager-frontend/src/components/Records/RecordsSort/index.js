import workerInstance from "../../../workers/workerActions"
import {
  setRecordsSortedBy,
  setSortedRecords
} from "../../../actions/recordActions"

const recordsSort = async (
  fieldType,
  recordFieldId,
  order,
  resource,
  values,
  dispatch,
  deleted
) =>
  await workerInstance
    .handleSortBy(fieldType, recordFieldId, order, resource, values)
    .then(({ id, recordFieldId, sortedRecords }) => {
      dispatch(setRecordsSortedBy({ id, recordFieldId, order, deleted }))
      if (sortedRecords)
        return dispatch(setSortedRecords(sortedRecords, resource.id, deleted))
    })

export default recordsSort
