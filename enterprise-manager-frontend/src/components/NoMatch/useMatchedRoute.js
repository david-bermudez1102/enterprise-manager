import { useLocation, matchPath } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const useMatchedRoute = () => {
  const { routes } = useSelector(s => s);
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

  return matched;
};

export default useMatchedRoute;
