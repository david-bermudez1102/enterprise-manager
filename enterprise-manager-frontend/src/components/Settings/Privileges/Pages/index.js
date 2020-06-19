import React, { useState } from "react"
import { Collapse } from "antd"
import { useLocation, useHistory, useRouteMatch } from "react-router-dom"
import Route from "../../../../Router/Route"
import PagesPermissions from "./PagesPermissions"

const pagesList = [
  { header: "Resources", route: "resources", pageName: "Form" },
  { header: "Organizations", route: "organizations", pageName: "Organization" },
  { header: "Records", route: "records", pageName: "Record" },
  { header: "Accounts", route: "accounts", pageName: "Account" }
]

const Pages = () => {
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()
  const { organizationId } = match.params

  const onChange = key =>
    history.push(key || `/organizations/${organizationId}/settings/privileges`)

  return (
    <Collapse
      activeKey={location.pathname}
      onChange={onChange}
      accordion
      bordered={false}>
      {pagesList.map(p => (
        <Collapse.Panel
          style={{ alignContent: "center" }}
          key={`${match.url}/${p.route}`}
          header={p.header}>
          <Route path={`${match.path}/${p.route}`} name={p.header}>
            <PagesPermissions pageName={p.pageName} />
          </Route>
        </Collapse.Panel>
      ))}
    </Collapse>
  )
}

export default Pages
