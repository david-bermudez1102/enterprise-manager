import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { useLocation } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import { fetchStatistics } from "../../../../actions/statisticActions"

export const useStatistics = ({ resource }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
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
  }, [location])

  useEffect(() => {
    setFilteredBy(filtersApplied[0])
  }, [filtersApplied])

  const generateColor = useCallback(
    () => `${getRandomInt(256)}, ${getRandomInt(256)}, ${getRandomInt(256)}`,
    []
  )

  const getRandomInt = useCallback(
    max => Math.floor(Math.random() * Math.floor(max)),
    []
  )

  const filterData = () =>
    dispatch(fetchStatistics(resource, queryParams.toString()))

  useEffect(() => {
    setCurrentStatistics(statistics[resource.id] || {})
  }, [statistics])

  useEffect(() => {
    if (currentStatistics)
      setColors(
        Object.values(currentStatistics[filteredBy] || {}).map(generateColor)
      )
  }, [currentStatistics, statistics, filteredBy])

  console.log(filteredBy)
  return {
    chartType,
    statistics: currentStatistics[filteredBy] || {},
    colors,
    filteredBy,
    filtersApplied,
    filterData
  }
}
