import { useState, useEffect, useCallback, useRef } from "react"
import { chunk } from "lodash"
import { useLocation, useHistory, useRouteMatch } from "react-router-dom"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import chunkOfRecordsProxy from "./chunkOfRecordsProxy"
import recordsSort from "../RecordsSort"

export const useChangePage = props => {
  const {
    sortedRecords,
    filteredRecords,
    filteredData,
    values,
    resource,
    sorting
  } = props

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()
  const mounted = useRef()
  const queryParams = new URLSearchParams(location.search)

  const { pagination, recordsSortedBy } = useSelector(
    ({ pagination, recordsSortedBy }) => ({ pagination, recordsSortedBy }),
    shallowEqual
  )
  const payload = filteredRecords || sortedRecords

  const [page, setPage] = useState(1)
  const [loadingData, setLoadingData] = useState(false)

  const [paginationLimit, setPaginationLimit] = useState(pagination.limit)

  const [chunkOfRecords, setChunkOfRecords] = useState(
    chunk(payload, paginationLimit)
  )

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      if (sorting) setLoadingData(true)
      chunkOfRecordsProxy(payload, paginationLimit)
        .then(setChunkOfRecords)
        .then(() => (sorting ? setLoadingData(false) : null))
    }
    // eslint-disable-next-line
  }, [payload, paginationLimit])

  useEffect(() => {
    if (
      !recordsSortedBy.some(r => r.id === resource.id) &&
      (filteredData || values)
    ) {
      setLoadingData(true)
      recordsSort(
        null,
        "listingId",
        "descend",
        resource,
        filteredData || values,
        dispatch,
        props.deleted
      ).then(() => setLoadingData(false))
    }
    // eslint-disable-next-line
  }, [recordsSortedBy, resource, filteredData, values])

  const changePage = useCallback(() => {
    setLoadingData(true)
    chunkOfRecordsProxy(payload, pagination.limit)
      .then(resp => {
        const currentValue = chunkOfRecords[page - 1][0]
        const newQueryParams = new URLSearchParams(location.search)
        if (newQueryParams.has("page")) newQueryParams.delete("page")

        setPaginationLimit(pagination.limit)
        setChunkOfRecords(resp)
        history.replace({
          path: location.pathname,
          search: `page=${
            resp.findIndex(e => e.some(y => y.id === currentValue.id)) + 1
          }&${newQueryParams.toString()}`
        })
      })
      .then(() => setLoadingData(false))
    // eslint-disable-next-line
  }, [
    chunkOfRecords,
    filteredRecords,
    sortedRecords,
    pagination.limit,
    history,
    location.pathname
  ])

  useEffect(() => {
    if (pagination.limit !== paginationLimit) changePage()
    // eslint-disable-next-line
  }, [pagination.limit, paginationLimit])

  useEffect(() => {
    setPage(
      parseInt(queryParams.get("page")) >
        Math.ceil(
          filteredRecords
            ? filteredRecords.length / pagination.limit
            : sortedRecords.length / pagination.limit
        ) || !queryParams.get("page")
        ? 1
        : parseInt(queryParams.get("page"))
    )

    // eslint-disable-next-line
  }, [queryParams])

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
    loadingData
  }
}
