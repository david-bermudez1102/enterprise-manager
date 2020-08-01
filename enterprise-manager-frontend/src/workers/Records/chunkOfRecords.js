import chunk from "lodash/chunk"

export const chunkOfRecords = async (sortedRecords, paginationLimit) => {
  const c = new Promise(chunk(sortedRecords, paginationLimit))
  return await c
}
