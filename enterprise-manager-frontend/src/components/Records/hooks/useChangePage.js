import { useState, useEffect, useCallback, useRef } from "react";
import { chunk } from "lodash";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import workerInstance from "../../../workers/workerActions";
import { setSortedRecords } from "../../../actions/recordActions";
import chunkOfRecordsProxy from "./chunkOfRecordsProxy";

export const useChangePage = props => {
  const { sortedRecords, filteredRecords, records, values, resource } = props;
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const mounted = useRef();
  const queryParams = new URLSearchParams(location.search);
  const { pagination, recordsSortedBy } = useSelector(
    ({ pagination, recordsSortedBy }) => ({ pagination, recordsSortedBy }),
    shallowEqual
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (sortedRecords.length < records.length) {
      const sortBy = async () => {
        const sorted = await workerInstance.sortBy(values);
        if (sorted) dispatch(setSortedRecords(sorted, resource.id));
      };
      sortBy();
    }
  }, [dispatch, records, values, resource, sortedRecords]);

  const [paginationLimit, setPaginationLimit] = useState(pagination.limit);

  const [chunkOfRecords, setChunkOfRecords] = useState(
    chunk(filteredRecords || sortedRecords, paginationLimit)
  );

  const changePage = useCallback(() => {
    chunkOfRecordsProxy(
      filteredRecords || sortedRecords,
      pagination.limit
    ).then(resp => {
      const currentValue = chunkOfRecords[page - 1][0];
      setPaginationLimit(pagination.limit);
      setChunkOfRecords(resp);
      history.replace(
        `${location.pathname}?page=${
          resp.findIndex(e => e.some(y => y.id === currentValue.id)) + 1
        }`
      );
    });
    // eslint-disable-next-line
  }, [
    chunkOfRecords,
    filteredRecords,
    sortedRecords,
    pagination.limit,
    history,
    location.pathname,
  ]);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setPage(
        parseInt(queryParams.get("page")) >
          Math.ceil(
            filteredRecords
              ? filteredRecords.length / pagination.limit
              : resource.recordsCount / pagination.limit
          ) || !queryParams.get("page")
          ? 1
          : parseInt(queryParams.get("page"))
      );
    }
    // eslint-disable-next-line
  }, [queryParams]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (pagination.limit !== paginationLimit) changePage();
    }
  }, [pagination.limit, paginationLimit, changePage]);

  useEffect(() => {
    if (parseInt(queryParams.get("page")) !== page) {
      history.replace(`${location.pathname}?page=${page}`);
      console.log("done");
    }
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      chunkOfRecordsProxy(
        filteredRecords || sortedRecords,
        paginationLimit
      ).then(setChunkOfRecords);
    }
  }, [filteredRecords, sortedRecords, paginationLimit]);

  return {
    sortedRecords,
    recordsSortedBy,
    page,
    match,
    dispatch,
    history,
    location,
    chunkOfRecords,
    paginationLimit,
  };
};
