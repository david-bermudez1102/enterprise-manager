import React, { useState, useCallback, useEffect } from "react"
import { Bar, Doughnut, Pie, Line } from "react-chartjs-2"
import ChartOptions from "./ChartOptions"

const WithType = ({ chartType, data, xAxesLabel, yAxesLabel }) => {
  const getOptions = useCallback(
    () => ({
      scales: {
        xAxes: [
          {
            scaleLabel: {
              labelString: xAxesLabel,
              display: xAxesLabel ? true : false
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              labelString: yAxesLabel || "Quantity",
              display: true
            }
          }
        ]
      }
    }),
    [xAxesLabel, yAxesLabel]
  )

  const [options, setOptions] = useState(getOptions())

  useEffect(() => {
    setOptions(getOptions())
  }, [getOptions])

  let chart

  switch (chartType) {
    case "bar":
      chart = <Bar data={data} redraw={true} options={options} />
      break
    case "doughnut":
      chart = <Doughnut data={data} redraw={true} />
      break
    case "pie":
      chart = <Pie data={data} redraw={true} />
      break
    default:
      chart = (
        <Line
          data={data}
          options={options}
          getElementAtEvent={activeElements => {
            if (activeElements[0]) console.log(activeElements[0])
          }}
        />
      )
  }

  return (
    <>
      <ChartOptions />
      {chart}
    </>
  )
}

export default React.memo(WithType)
