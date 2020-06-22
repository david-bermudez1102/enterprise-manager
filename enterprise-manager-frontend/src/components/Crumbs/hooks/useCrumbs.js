import React, { useCallback } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { matchPath, useLocation } from "react-router-dom"
import Icon from "@ant-design/icons"

const useCrumbs = () => {
  const { routes } = useSelector(({ routes }) => ({ routes }), shallowEqual)
  const location = useLocation()
  const currentPath = useCallback(
    () =>
      matchPath(location.pathname, {
        path: routes.map(r => r.path),
        exact: true
      }) || { path: "" },
    [routes, location]
  )

  const pathToRoutes = currentPath()
    .path.split("/")

    .map((p, i, arr) => arr.slice(0, i + 1).join("/"))
    .map(
      r =>
        (matchPath(r, { path: routes.map(r => r.path), exact: true }) || {})
          .path
    )

  const crumbs = routes
    .filter(r => pathToRoutes.some(p => p === r.path))
    .map(route =>
      matchPath(location.pathname, { path: route.path })
        ? route.path === "/"
          ? {
              breadcrumbName: (
                <Icon
                  style={{ verticalAlign: 0 }}
                  component={() => <i className='far fa-home'></i>}
                />
              ),
              path: "/"
            }
          : {
              breadcrumbName: route.name,
              path: matchPath(location.pathname, {
                path: route.path
              }).url
            }
        : null
    )
    .filter(route => route.path && route.breadcrumbName)
    .sort((a, b) => a.path.length - b.path.length)

  return crumbs
}

export default useCrumbs
