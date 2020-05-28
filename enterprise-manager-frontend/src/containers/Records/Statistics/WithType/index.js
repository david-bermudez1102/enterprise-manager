import React from "react"
import { Bar, Doughnut, Pie, Line } from "react-chartjs-2"

const WithType = ({ chartType, data }) => {
  switch (chartType) {
    case "bar":
      return <Bar data={data} redraw={true} />
    case "doughnut":
      return <Doughnut data={data} redraw={true} />
    case "pie":
      return <Pie data={data} redraw={true} />
    default:
      return <Line data={data} redraw={true} />
  }
}

export default WithType
