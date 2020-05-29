import React, { useState, useCallback, useEffect } from "react"
import { Bar, Doughnut, Pie, Line } from "react-chartjs-2"

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

  switch (chartType) {
    case "bar":
      return <Bar data={data} redraw={true} options={options} />
    case "doughnut":
      return <Doughnut data={data} redraw={true} />
    case "pie":
      return <Pie data={data} redraw={true} />
    default:
      return (
        <Line
          data={data}
          options={options}
          getElementAtEvent={activeElements => {
            if (activeElements[0]) console.log(activeElements[0])
          }}
        />
      )
  }
}

export default React.memo(WithType)
