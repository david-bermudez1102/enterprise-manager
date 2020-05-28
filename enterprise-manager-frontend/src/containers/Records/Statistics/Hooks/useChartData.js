import { useState, useCallback, useEffect } from "react"
import { format } from "date-fns"

const useChartData = ({
  label,
  eachPeriod,
  dateFormat,
  statistics,
  colors,
  borderWidth
}) => {
  const getDataEachPeriod = useCallback(
    () =>
      eachPeriod.map(
        d =>
          statistics[
            Object.keys(statistics).find(
              s => format(new Date(s), dateFormat) === d
            )
          ] || 0
      ),
    [eachPeriod, statistics]
  )

  const [dataEachPeriod, setDataEachPeriod] = useState(getDataEachPeriod())

  const getColorsEachPeriod = useCallback(
    () =>
      eachPeriod.map(
        d =>
          colors[
            Object.keys(statistics).findIndex(
              s => format(new Date(s), dateFormat) === d
            )
          ]
      ),
    [eachPeriod, statistics, colors]
  )

  const [colorsEachPeriod, setColorsEachPeriod] = useState(
    getColorsEachPeriod()
  )

  const getData = useCallback(
    () => ({
      labels: eachPeriod,
      datasets: [
        {
          label: label || "# of records",
          data: dataEachPeriod,
          backgroundColor: colorsEachPeriod.map(color =>
            color ? `rgba(${color},0.2)` : `rgba(255,255,255,1)`
          ),
          borderColor: colorsEachPeriod.map(color =>
            color ? `rgba(${color},1)` : `red`
          ),
          borderWidth: borderWidth || 1
        }
      ]
    }),
    [eachPeriod, dataEachPeriod, colorsEachPeriod]
  )

  const [data, setData] = useState(getData())

  useEffect(() => {
    setDataEachPeriod(getDataEachPeriod())
  }, [getDataEachPeriod])

  useEffect(() => {
    setColorsEachPeriod(getColorsEachPeriod())
  }, [getColorsEachPeriod])

  useEffect(() => {
    setData(getData())
  }, [getData])

  return data
}

export default useChartData
