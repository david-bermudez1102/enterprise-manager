import chunk from "lodash/chunk"

const chunkOfRecordsProxy = async (records, paginationLimit) => {
  return chunk(records, paginationLimit)
}
export default chunkOfRecordsProxy
