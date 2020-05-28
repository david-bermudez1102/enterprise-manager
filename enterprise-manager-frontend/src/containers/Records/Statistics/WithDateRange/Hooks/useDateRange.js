import { format, eachMonthOfInterval } from "date-fns"
import useChartData from "../../Hooks/useChartData"
import { useState, useEffect } from "react"

const dateFormat = "MMMM"

const useDateRange = ({
  statistics,
  colors,
  startDate,
  endDate,
  customDateFormat
}) => {
  const getStart = () => new Date(startDate || Object.keys(statistics)[0])
  const getEnd = () =>
    new Date(
      endDate || Object.keys(statistics)[Object.keys(statistics).length - 1]
    )

  const [end, setEnd] = useState(getEnd())
  const [start, setStart] = useState(getStart())

  const getEachPeriod = () =>
    eachMonthOfInterval({ start, end }).map(d =>
      format(new Date(d), dateFormat)
    )

  const [eachPeriod, setEachPeriod] = useState(getEachPeriod())

  useEffect(() => {
    setStart(getStart())
  }, [statistics])

  useEffect(() => {
    setEnd(getEnd())
  }, [start])

  useEffect(() => {
    setEachPeriod(getEachPeriod())
  }, [start, end])

  const data = useChartData({
    eachPeriod,
    dateFormat: customDateFormat || dateFormat,
    statistics,
    colors
  })

  console.log(end)

  return data
}

export default useDateRange
