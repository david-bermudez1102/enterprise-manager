import { useLocation } from "react-router-dom"
import { useState, useCallback } from "react"
import { filterByDateRange as filterByDateRangeProxy } from "../filterByDateRange"
import { filterByMonth as filterByMonthProxy } from "../filterByMonth"

const useFilters = ({ dataSource, oldest, newest, action }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [filteredData, setFilteredData] = useState(null)

  const filterByDateRange = useCallback(() => {
    if (queryParams.get("date_range"))
      filterByDateRangeProxy(
        dataSource,
        oldest,
        newest,
        queryParams,
        setFilteredData
      )
    else setFilteredData(null)
  }, [location])

  const filterByMonth = useCallback(() => {
    if (queryParams.get("month_year"))
      filterByMonthProxy(
        dataSource,
        oldest,
        queryParams,
        location,
        action,
        setFilteredData
      )
  }, [location])

  console.log(dataSource)

  return { filteredData, filterByDateRange, filterByMonth }
}

export default useFilters
