import React from "react"
import {
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined
} from "@ant-design/icons"
import { Tabs } from "antd"
import { useLocation, Link } from "react-router-dom"

const { TabPane } = Tabs

const ChartOptions = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const getLinkTo = chart_type => {
    const queryParams = new URLSearchParams(location.search)
    if (queryParams.has("chart_type")) queryParams.delete("chart_type")
    return {
      pathname: location.pathname,
      search: `chart_type=${chart_type}&${queryParams.toString()}`
    }
  }

  return (
    <Tabs
      activeKey={`chartType_${queryParams.get("chart_type")}`}
      size={"large"}>
      <TabPane
        tab={
          <Link to={getLinkTo("line")}>
            <LineChartOutlined />
          </Link>
        }
        key={`chartType_line`}
      />
      <TabPane
        tab={
          <Link to={getLinkTo("bar")}>
            <BarChartOutlined />
          </Link>
        }
        key={`chartType_bar`}
      />
      <TabPane
        tab={
          <Link to={getLinkTo("pie")}>
            <PieChartOutlined />
          </Link>
        }
        key={`chartType_pie`}
      />
    </Tabs>
  )
}

export default ChartOptions
