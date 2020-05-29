import { format } from "date-fns"
import useChartData from "../../Hooks/useChartData"
import { useState, useEffect, useCallback } from "react"

const dateFormat = "H"

const useWithDate = ({
  statistics,
  colors,
  startDate,
  endDate,
  customDateFormat
}) => {
  const getStart = () => new Date(Object.keys(statistics)[0])
  const getEnd = () =>
    new Date(
      endDate || Object.keys(statistics)[Object.keys(statistics).length - 1]
    )

  const [end, setEnd] = useState(getEnd())
  const [start, setStart] = useState(getStart())

  const getEachPeriod = () =>
    Array.from({ length: 24 }, (v, i) => i).map(d =>
      format(
        new Date(start.getFullYear(), start.getMonth(), start.getDate(), d),
        dateFormat
      )
    )

  const [eachPeriod, setEachPeriod] = useState(getEachPeriod())

  useEffect(() => {
    setStart(getStart())
    // eslint-disable-next-line
  }, [statistics])

  useEffect(() => {
    setEnd(getEnd())
    // eslint-disable-next-line
  }, [start])

  useEffect(() => {
    setEachPeriod(getEachPeriod())
    // eslint-disable-next-line
  }, [start, end])

  const chartData = useChartData({
    eachPeriod,
    dateFormat: customDateFormat || dateFormat,
    statistics,
    colors
  })

  const dataFormatted = useCallback(
    () => ({
      ...chartData,
      labels: Array.from({ length: 24 }, (v, i) => i).map(d =>
        format(
          new Date(start.getFullYear(), start.getMonth(), start.getDate(), d),
          "pp"
        )
      )
    }),
    // eslint-disable-next-line
    [chartData]
  )

  const [data, setData] = useState(dataFormatted())

  useEffect(() => {
    setData(dataFormatted())
  }, [dataFormatted])

  return data
}

export default useWithDate
