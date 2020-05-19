import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { matchPath, useLocation } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const useCrumbs = () => {
  const { routes } = useSelector(({ routes }) => ({ routes }), shallowEqual);
  const location = useLocation();
  const crumbs = routes
    .map(route =>
      matchPath(location.pathname, { path: route.path })
        ? route.path === "/"
          ? { breadcrumbName: <HomeOutlined />, path: "/" }
          : {
              breadcrumbName: route.name,
              path: matchPath(location.pathname, { path: route.path }).url,
            }
        : null
    )
    .filter(route => route)
    .filter(route => route.path && route.breadcrumbName)
    .sort((a, b) => a.path.length - b.path.length)
    .filter((v, i, a) => a.findIndex(t => t.path === v.path) === i);
  return crumbs;
};

export default useCrumbs;
