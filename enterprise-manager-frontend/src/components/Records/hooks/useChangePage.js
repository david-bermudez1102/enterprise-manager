import { useState, useEffect, useCallback, useRef } from "react"
import { chunk } from "lodash"
import { useLocation, useHistory, useRouteMatch } from "react-router-dom"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import workerInstance from "../../../workers/workerActions"
import { setSortedRecords } from "../../../actions/recordActions"
import chunkOfRecordsProxy from "./chunkOfRecordsProxy"
import recordsSort from "../RecordsSort"

export const useChangePage = props => {
  const {
    sortedRecords,
    filteredRecords,
    filteredData,
    values,
    resource
  } = props
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const mounted = useRef()
  const queryParams = new URLSearchParams(location.search)
  const { pagination, recordsSortedBy } = useSelector(
    ({ pagination, recordsSortedBy }) => ({ pagination, recordsSortedBy }),
    shallowEqual
  )
  const getPayload = () => filteredRecords || sortedRecords

  const [page, setPage] = useState(1)
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      if (!recordsSortedBy.some(r => r.id === resource.id)) {
        recordsSort(
          "listingId",
          "descend",
          resource,
          filteredData || values,
          dispatch,
          props.deleted
        )
      }
    }
    // eslint-disable-next-line
  }, [recordsSortedBy, resource])

  const [paginationLimit, setPaginationLimit] = useState(pagination.limit)

  const [chunkOfRecords, setChunkOfRecords] = useState(
    chunk(getPayload(), paginationLimit)
  )

  useEffect(() => {
    setLoadingData(true)
    chunkOfRecordsProxy(getPayload(), paginationLimit)
      .then(setChunkOfRecords)
      .then(() => setLoadingData(false))
  }, [filteredRecords, sortedRecords, paginationLimit])

  const changePage = useCallback(() => {
    setLoadingData(true)
    chunkOfRecordsProxy(getPayload(), pagination.limit)
      .then(resp => {
        const currentValue = chunkOfRecords[page - 1][0]
        setPaginationLimit(pagination.limit)
        setChunkOfRecords(resp)
        history.replace(
          `${location.pathname}?page=${
            resp.findIndex(e => e.some(y => y.id === currentValue.id)) + 1
          }`
        )
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
