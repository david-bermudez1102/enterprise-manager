import { useLocation, matchPath } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { useState, useEffect } from "react";

const useMatchedRoute = () => {
  const { routes } = useSelector(({ routes }) => ({ routes }), shallowEqual);
  const location = useLocation();
  const [routesList, setRoutesList] = useState(routes);
  const [matched, setMatched] = useState(true);

  useEffect(() => {
    setRoutesList(routes);
  }, [routes]);

  useEffect(() => {
    if (routesList) {
      setMatched(
        routesList.some(route =>
          matchPath(location.pathname, { path: route, exact: true })
        )
      );
      setRoutesList(null);
    }
  }, [routesList, location]);

  useEffect(() => {
    if (!matched) setMatched(true);
    // eslint-disable-next-line
  }, [location]);

  return matched;
};

export default useMatchedRoute;
