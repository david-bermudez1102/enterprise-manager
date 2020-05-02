import { useState, useEffect, useCallback } from "react";
import { chunk } from "lodash";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import workerInstance from "../../../workers/workerActions";
import { setSortedRecords } from "../../../actions/recordActions";
import { addInfoAlert } from "../../../actions/alertsActions";
import chunkOfRecordsProxy from "./chunkOfRecordsProxy";

export const useChangePage = (props) => {
  const { sortedRecords, filteredRecords, records, values, resource } = props;
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const { pagination, recordsSortedBy } = useSelector((state) => state);

  const page =
    parseInt(queryParams.get("page")) >
      Math.ceil(resource.recordsCount / pagination.limit) ||
    !queryParams.get("page")
      ? 1
      : parseInt(queryParams.get("page"));

  useEffect(() => {
    if (sortedRecords.length < records.length) {
      const sortBy = async () => {
        const { sortedRecords, message } = await workerInstance.sortBy(
          0,
          records,
          values,
          false,
          resource
        );
        if (sortedRecords)
          dispatch(setSortedRecords(sortedRecords, resource.id));
        if (message) dispatch(addInfoAlert([message]));
      };
      sortBy();
    }
  }, [dispatch, records, values, resource, sortedRecords]);

  const [paginationLimit, setPaginationLimit] = useState(pagination.limit);

  const [chunkOfRecords, setChunkOfRecords] = useState(
    chunk(sortedRecords, paginationLimit)
  );

  useEffect(() => {
    chunkOfRecordsProxy(filteredRecords || sortedRecords, paginationLimit).then(
      setChunkOfRecords
    );
  }, [filteredRecords, sortedRecords, paginationLimit]);

  const changePage = useCallback(() => {
    chunkOfRecordsProxy(
      filteredRecords || sortedRecords,
      pagination.limit
    ).then((resp) => {
      const currentValue = chunkOfRecords[page - 1][0];
      const newChunk = resp;
      setPaginationLimit(pagination.limit);
      setChunkOfRecords(newChunk);
      history.replace(
        `${location.pathname}?page=${
          newChunk.findIndex((e) => e.some((y) => y.id === currentValue.id)) + 1
        }`
      );
    });
  }, [
    chunkOfRecords,
    filteredRecords,
    sortedRecords,
    pagination.limit,
    history,
    location.pathname,
    page,
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
    dispatch,
  };
};
