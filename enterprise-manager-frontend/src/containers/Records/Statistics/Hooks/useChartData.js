import { useState, useCallback, useEffect } from "react"
import { format } from "date-fns"
import { useLocation } from "react-router-dom"

const useChartData = ({
  label,
  eachPeriod,
  dateFormat,
  statistics,
  colors,
  borderWidth,
  customChartType
}) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [chartType, setChartType] = useState(
    queryParams.get("chart_type") || customChartType
  )

  useEffect(() => {
    setChartType(queryParams.get("chart_type") || customChartType)
  }, [customChartType, queryParams])

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
    [eachPeriod, statistics, dateFormat]
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
    [eachPeriod, statistics, colors, dateFormat]
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
          fill: chartType === "line" || !chartType ? true : true,
          data: dataEachPeriod,
          backgroundColor:
            chartType === "line" || !chartType
              ? `rgba(${colors[0]},0.2)`
              : colorsEachPeriod.map(color =>
                  color ? `rgba(${color},0.2)` : `rgba(255,255,255,1)`
                ),
          borderColor:
            chartType === "line" || !chartType
              ? `rgba(${colors[0]},1)`
              : colorsEachPeriod.map(color =>
                  color ? `rgba(${color},1)` : `red`
                ),
          pointBackgroundColor:
            chartType === "line" || !chartType
              ? `rgba(${colors[0]},0.2)`
              : undefined,
          borderWidth:
            chartType === "line" || !chartType ? 3 : borderWidth || 2,
          xAxis: { labelString: "Hello" }
        }
      ]
    }),
    // eslint-disable-next-line
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
