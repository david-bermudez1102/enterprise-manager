import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { useLocation } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import { fetchStatistics } from "../../../../actions/statisticActions"

export const useStatistics = ({ resource, customParams }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const queryParams = new URLSearchParams(customParams || location.search)
  const chartType = queryParams.get("chart_type")

  const filters = ["date_range", "month_year", "date"]

  const [filtersApplied, setFiltersApplied] = useState([
    filters.find(q => queryParams.toString().includes(q)) ||
      "with_last_six_months"
  ])

  const [filteredBy, setFilteredBy] = useState(
    filters.find(q => queryParams.toString().includes(q)) ||
      "with_last_six_months"
  )

  const { statistics } = useSelector(
    ({ statistics }) => ({ statistics }),
    shallowEqual
  )

  const [currentStatistics, setCurrentStatistics] = useState(
    statistics[resource.id] || {}
  )

  const [colors, setColors] = useState([])

  useEffect(() => {
    if (filters.some(f => queryParams.toString().includes(f)))
      setFiltersApplied([filters.find(q => queryParams.toString().includes(q))])
    else setFiltersApplied(["with_last_six_months"])
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    setFilteredBy(filtersApplied[0])
  }, [filtersApplied])

  const getRandomInt = useCallback(
    max => Math.floor(Math.random() * Math.floor(max)),
    []
  )
  const generateColor = useCallback(
    () => `${getRandomInt(256)}, ${getRandomInt(256)}, ${getRandomInt(256)}`,
    [getRandomInt]
  )

  const filterData = useCallback(
    () => dispatch(fetchStatistics(resource, queryParams.toString())),
    [resource, queryParams, dispatch]
  )

  useEffect(() => {
    setCurrentStatistics(statistics[resource.id] || {})
  }, [statistics, resource])

  useEffect(() => {
    if (filteredBy === "with_last_six_months") filterData()
    // eslint-disable-next-line
  }, [filteredBy])

  useEffect(() => {
    if (currentStatistics[filteredBy])
      setColors(
        Object.values(currentStatistics[filteredBy] || {}).map(generateColor)
      )
    // eslint-disable-next-line
  }, [currentStatistics[filteredBy]])

  return {
    chartType,
    statistics: currentStatistics[filteredBy] || {},
    colors,
    filteredBy,
    filtersApplied,
    filterData,
    resource
  }
}
