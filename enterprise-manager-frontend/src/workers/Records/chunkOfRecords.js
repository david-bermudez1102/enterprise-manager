import chunk from "lodash/chunk";

export const chunkOfRecords = (sortedRecords, paginationLimit) => {
  return chunk(sortedRecords, paginationLimit);
};
