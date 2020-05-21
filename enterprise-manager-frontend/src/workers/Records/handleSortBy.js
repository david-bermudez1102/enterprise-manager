import * as sortByWorker from "./sortBy.js"

export const handleSortBy = async (recordFieldId, order, resource, values) => {
  if (
    /* eslint-disable-next-line no-restricted-globals */
    self.WorkerGlobalScope
  ) {
    console.log("huzzah! a worker!")
  } else {
    console.log("window")
  }

  const sortedRecords = await sortByWorker.sortBy(values, recordFieldId, order)
  return { id: resource.id, recordFieldId, sortedRecords, order }
}
