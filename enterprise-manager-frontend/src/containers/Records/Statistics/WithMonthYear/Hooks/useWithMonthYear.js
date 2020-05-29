import {
  format,
  eachDayOfInterval,
  getDaysInMonth,
  getYear,
  getMonth
} from "date-fns"
import useChartData from "../../Hooks/useChartData"
import { useState, useCallback, useEffect } from "react"

const dateFormat = "MMM do"

const useWithMonthYear = ({ statistics, colors }) => {
  const currentDate = new Date()

  const getFirstDate = useCallback(
    () =>
      Object.keys(statistics).length > 0
        ? new Date(Object.keys(statistics)[0])
        : null,
    [statistics]
  )

  const [firstDate, setFirstDate] = useState(getFirstDate())

  const getTotalDaysInMonth = useCallback(
    () => (firstDate ? getDaysInMonth(firstDate) : null),
    [firstDate]
  )

  const [daysInMonth, setDaysInMonth] = useState(getTotalDaysInMonth())

  const getEndDate = useCallback(
    () =>
      firstDate && daysInMonth
        ? new Date(getYear(firstDate), getMonth(firstDate), daysInMonth)
        : null,
    [firstDate, daysInMonth]
  )

  const [endDate, setEndDate] = useState(getEndDate())

  const getEachPeriod = useCallback(
    () =>
      firstDate && endDate && firstDate.getTime() < endDate.getTime()
        ? eachDayOfInterval({
            start: new Date(firstDate.getFullYear(), firstDate.getMonth(), 1),
            end:
              firstDate.getMonth() === currentDate.getMonth() &&
              firstDate.getFullYear() === currentDate.getFullYear()
                ? currentDate
                : endDate
          }).map(d => format(new Date(d), dateFormat))
        : [],
    // eslint-disable-next-line
    [firstDate, endDate]
  )

  const [eachPeriod, setEachPeriod] = useState(getEachPeriod())

  useEffect(() => {
    setFirstDate(getFirstDate())
  }, [getFirstDate])

  useEffect(() => {
    setDaysInMonth(getTotalDaysInMonth())
  }, [getTotalDaysInMonth])

  useEffect(() => {
    setEndDate(getEndDate())
  }, [getEndDate])

  useEffect(() => {
    setEachPeriod(getEachPeriod())
  }, [getEachPeriod])

  const data = useChartData({ eachPeriod, dateFormat, statistics, colors })

  return data
}

export default useWithMonthYear
