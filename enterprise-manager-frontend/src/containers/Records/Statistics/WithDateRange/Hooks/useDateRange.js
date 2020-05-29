import { format, eachMonthOfInterval } from "date-fns"
import useChartData from "../../Hooks/useChartData"
import { useState, useEffect, useCallback } from "react"

const dateFormat = "MMMM"

const useDateRange = ({
  statistics,
  colors,
  chartType,
  startDate,
  endDate,
  customDateFormat
}) => {
  const getStart = useCallback(
    () => new Date(startDate || Object.keys(statistics)[0]),
    // eslint-disable-next-line
    [statistics]
  )

  const [start, setStart] = useState(getStart())

  const getEnd = useCallback(
    () =>
      new Date(
        endDate || Object.keys(statistics)[Object.keys(statistics).length - 1]
      ),
    // eslint-disable-next-line
    [start]
  )

  const [end, setEnd] = useState(getEnd())

  const getEachPeriod = useCallback(
    () =>
      eachMonthOfInterval({ start, end }).map(d =>
        format(new Date(d), dateFormat)
      ),
    [start, end]
  )

  const [eachPeriod, setEachPeriod] = useState(getEachPeriod())

  useEffect(() => {
    setStart(getStart())
  }, [getStart])

  useEffect(() => {
    setEnd(getEnd())
  }, [getEnd])

  useEffect(() => {
    setEachPeriod(getEachPeriod())
  }, [getEachPeriod])

  const data = useChartData({
    eachPeriod,
    dateFormat: customDateFormat || dateFormat,
    statistics,
    colors,
    customChartType: chartType
  })

  return data
}

export default useDateRange
