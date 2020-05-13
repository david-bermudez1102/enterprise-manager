import * as handleSortByWorker from "./Records/handleSortBy.js";
import * as fetchRecordsWorker from "./Records/fetchRecords.js";
import * as sortByWorker from "./Records/sortBy.js";
import * as chunkOfRecordsWorker from "./Records/chunkOfRecords.js";
import * as filtersWorker from "./Records/filterRecords.js";

export const handleSortBy = handleSortByWorker.handleSortBy;
export const fetchRecords = fetchRecordsWorker.fetchRecords;
export const sortBy = sortByWorker.sortBy;
export const chunkOfRecords = chunkOfRecordsWorker.chunkOfRecords;
export const filters = filtersWorker.filters;
export const filterRecords = filtersWorker.filterRecords;
