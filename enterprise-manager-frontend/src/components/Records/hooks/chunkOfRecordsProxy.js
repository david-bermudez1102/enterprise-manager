import workerInstance from "../../../workers/workerActions";
import chunk from "lodash/chunk";

const chunkOfRecordsProxy = (records, paginationLimit) => {
  try {
    return workerInstance.chunkOfRecords(records, paginationLimit);
  } catch (error) {
    return chunk(records, paginationLimit);
  }
};
export default chunkOfRecordsProxy;
