import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchRecords } from "../../../actions/recordActions"
import { useRouteMatch, useLocation } from "react-router-dom"

const useRecords = props => {
  const { resource, deleted } = props
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  queryParams.delete("page")

  const restOfParams = queryParams.toString()
  const withDateFilters = restOfParams.length > 0 ? true : false
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
    if (resource && !withDateFilters)
      dispatch(
        fetchRecords(
          resource.organizationId,
          resource.id,
          deleted,
          withDateFilters,
          restOfParams
        )
      )
  }, [location.pathname])

  return {
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
