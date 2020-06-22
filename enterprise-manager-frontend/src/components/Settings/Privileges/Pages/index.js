import React from "react"
import { Collapse } from "antd"
import { useLocation, useHistory, useRouteMatch } from "react-router-dom"
import Route from "../../../../Router/Route"
import PagesPermissions from "./PagesPermissions"
import Icon, { RightOutlined } from "@ant-design/icons"

const pagesList = [
  {
    header: "Resources",
    route: "resources",
    pageName: "Form",
    exclude: ["insertPrivilege"],
    icon: (
      <Icon
        style={{ verticalAlign: 0, marginRight: 8 }}
        component={() => <i className='fas fa-layer-group' />}
      />
    )
  },
  {
    header: "Organizations",
    route: "organizations",
    pageName: "Organization",
    exclude: ["insertPrivilege"],
    icon: <i className='fas fa-project-diagram' style={{ marginRight: 5 }}></i>
  },
  {
    header: "Records",
    route: "records",
    pageName: "Record",
    exclude: ["insertPrivilege"],
    icon: <i className='fas fa-table' style={{ marginRight: 8 }}></i>
  },
  {
    header: "Accounts",
    route: "accounts",
    pageName: "Account",
    exclude: ["insertPrivilege"],
    icon: <i className='fas fa-users' style={{ marginRight: 5 }}></i>
  },
  {
    header: "Roles",
    route: "roles",
    pageName: "Role",
    exclude: ["insertPrivilege"],
    icon: <i className='fas fa-tags' style={{ marginRight: 5 }}></i>
  }
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
      expandIcon={({ isActive }) => (
        <RightOutlined
          rotate={isActive ? 90 : 0}
          style={{ fontSize: "16px" }}
        />
      )}
      activeKey={location.pathname}
      onChange={onChange}
      accordion
      bordered={false}>
      {pagesList.map(p => (
        <Collapse.Panel
          style={{ alignContent: "center" }}
          key={`${match.url}/${p.route}`}
          header={
            <span>
              {p.icon}
              {p.header}
            </span>
          }>
          <Route path={`${match.path}/${p.route}`} name={p.header}>
            <PagesPermissions pageName={p.pageName} exclude={p.exclude} />
          </Route>
        </Collapse.Panel>
      ))}
    </Collapse>
  )
}

export default Pages
