import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { fetchRecords } from "../../../actions/recordActions"
import { useRouteMatch, useLocation } from "react-router-dom"
import { fetchValues } from "../../../actions/valueActions"

const useRecords = props => {
  const { resource, deleted } = props
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  queryParams.delete("page")
  const [loadingInitialData, setLoadingInitialData] = useState(false)
  const restOfParams = queryParams.toString()
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const {
    recordFields,
    records,
    archivedRecords,
    archivedValues,
    sortedRecords,
    sortedArchivedRecords,
    values
  } = useSelector(
    ({
      recordFields,
      records,
      archivedRecords,
      archivedValues,
      sortedRecords,
      sortedArchivedRecords,
      values
    }) => ({
      recordFields,
      records,
      archivedRecords,
      archivedValues,
      sortedRecords,
      sortedArchivedRecords,
      values
    }),
    shallowEqual
  )

  useEffect(() => {
    if (resource && restOfParams.length === 0) {
      setLoadingInitialData(true)
      dispatch(
        fetchRecords(resource.organizationId, resource.id, deleted)
      ).then(() => setLoadingInitialData(false))
      dispatch(fetchValues(resource.organizationId, resource.id))
    }
    // eslint-disable-next-line
  }, [location.pathname, restOfParams])

  return {
    loadingInitialData,
    resource,
    match,
    recordFields,
    records: deleted
      ? archivedRecords[resource.id] || []
      : records[resource.id] || [],
    sortedRecords: deleted ? sortedArchivedRecords : sortedRecords,
    values: deleted
      ? archivedValues[resource.id] || []
      : values[resource.id] || [],
    dispatch
  }
}

export default useRecords
