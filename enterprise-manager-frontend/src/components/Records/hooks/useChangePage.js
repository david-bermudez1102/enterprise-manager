import { useState, useEffect, useCallback } from "react";
import { chunk } from "lodash";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sortBy } from "../RecordsSort/sortBy";

export const useChangePage = props => {
  const { sortedRecords, filteredRecords, records, values, resource } = props;
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const { pagination, recordsSortedBy } = useSelector(state => state);

  const page =
    parseInt(queryParams.get("page")) >
      Math.ceil(resource.recordsCount / pagination.limit) ||
    !queryParams.get("page")
      ? 1
      : parseInt(queryParams.get("page"));

  useEffect(() => {
    if (sortedRecords.length < records.length)
      sortBy(0, records, values, false, resource, dispatch);
  }, [dispatch, records, values, resource, sortedRecords]);

  const [paginationLimit, setPaginationLimit] = useState(pagination.limit);

  const [chunkOfRecords, setChunkOfRecords] = useState(
    chunk(sortedRecords, paginationLimit)
  );

  useEffect(() => {
    setChunkOfRecords(chunk(filteredRecords || sortedRecords, paginationLimit));
  }, [filteredRecords, sortedRecords, paginationLimit]);

  const changePage = useCallback(() => {
    const currentValue = chunkOfRecords[page - 1][0];
    const newChunk = chunk(filteredRecords || sortedRecords, pagination.limit);
    setPaginationLimit(pagination.limit);
    history.replace(
      `${location.pathname}?page=${newChunk.findIndex(e =>
        e.includes(currentValue)
      ) + 1}`
    );
  }, [
    chunkOfRecords,
    filteredRecords,
    sortedRecords,
    pagination.limit,
    history,
    location.pathname,
    page
  ]);

  useEffect(() => {
    if (pagination.limit !== paginationLimit) changePage();
  }, [pagination.limit, paginationLimit, changePage]);

  return {
    chunkOfRecords,
    sortedRecords,
    recordsSortedBy,
    page,
    match,
    dispatch
  };
};
