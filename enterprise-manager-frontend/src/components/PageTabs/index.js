import React from "react"
import { Tabs } from "antd"
import { useLocation, useHistory } from "react-router-dom"
const { TabPane } = Tabs

const PageTabs = ({ tabs }) => {
  const location = useLocation()
  const history = useHistory()

  return (
    <Tabs
      activeKey={location.pathname}
      onChange={key => history.push(key)}
      style={{ margin: 0 }}>
      {tabs.map(tab => (
        <TabPane tab={tab.tab} key={tab.path} />
      ))}
    </Tabs>
  )
}
export default React.memo(PageTabs)
