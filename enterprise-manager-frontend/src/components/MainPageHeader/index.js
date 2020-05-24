import React from "react"
import { PageHeader } from "antd"
import useCrumbs from "../Crumbs/hooks/useCrumbs"
import { useHistory, useLocation, Link } from "react-router-dom"

const MainPageHeader = () => {
  const crumbs = useCrumbs()
  const location = useLocation()
  const history = useHistory()

  const itemRender = (route, params, routes, paths) =>
    routes.indexOf(route) === routes.length - 1 ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    )

  console.log(crumbs)
  return (
    <PageHeader
      style={{ paddingLeft: 0, paddingRight: 0 }}
      className='site-page-header'
      title={
        crumbs.find(crumb => crumb.path === location.pathname)
          ? crumbs.find(crumb => crumb.path === location.pathname)
              .breadcrumbName
          : null
      }
      breadcrumb={{ routes: crumbs, itemRender }}
      onBack={() => history.goBack()}
    />
  )
}

export default MainPageHeader
