import { useLocation } from "react-router-dom"
import { useState, useCallback, useEffect } from "react"
import { filterByDateRange as filterByDateRangeProxy } from "../filterByDateRange"
import { filterByMonth as filterByMonthProxy } from "../filterByMonth"
import { filterByDate as filterByDateProxy } from "../filterByDate"
import { searchResult as searchResultProxy } from "../searchResult"

const useFilters = ({ action }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [filteredData, setFilteredData] = useState(null)
  const [loadingFilteredData, setLoadingFilteredData] = useState(false)

  const filters = ["date_range", "month_year", "date", "query"]
  const filterByDateRange = useCallback(() => {
    if (queryParams.get("date_range")) {
      setLoadingFilteredData(true)
      filterByDateRangeProxy(
        queryParams,
        location,
        action,
        setFilteredData
      ).then(() => setLoadingFilteredData(false))
    }
    // eslint-disable-next-line
  }, [location])

  const filterByMonth = useCallback(() => {
    if (queryParams.get("month_year")) {
      setLoadingFilteredData(true)
      filterByMonthProxy(
        queryParams,
        location,
        action,
        setFilteredData
      ).then(() => setLoadingFilteredData(false))
    }
    // eslint-disable-next-line
  }, [location])

  const filterByDate = useCallback(() => {
    if (queryParams.get("date")) {
      setLoadingFilteredData(true)
      filterByDateProxy(
        queryParams,
        location,
        action,
        setFilteredData
      ).then(() => setLoadingFilteredData(false))
    }
    // eslint-disable-next-line
  }, [location])

  const searchResult = useCallback(() => {
    if (queryParams.get("query")) {
      setLoadingFilteredData(true)
      searchResultProxy(
        queryParams,
        location,
        action,
        setFilteredData
      ).then(() => setLoadingFilteredData(false))
    }
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    if (!filters.some(f => queryParams.toString().includes(f)))
      setFilteredData(null)
  }, [location])

  return {
    loadingFilteredData,
    filteredData,
    filterByDateRange,
    filterByMonth,
    filterByDate,
    searchResult
  }
}

export default useFilters
