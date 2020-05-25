import { useLocation, matchPath } from "react-router-dom"
import { useSelector, shallowEqual } from "react-redux"
import { useState, useEffect } from "react"

const useMatchedRoute = () => {
  const { routes } = useSelector(({ routes }) => ({ routes }), shallowEqual)
  const location = useLocation()
  const [checking, setChecking] = useState(false)
  const [matched, setMatched] = useState(true)

  useEffect(() => {
    setChecking(true)
  }, [routes, location])

  useEffect(() => {
    if (checking) {
      setMatched(
        routes.some(route =>
          matchPath(location.pathname, { path: route.path, exact: true })
        )
      )
      setChecking(false)
    }
    // eslint-disable-next-line
  }, [checking, location])

  useEffect(() => {
    if (!matched) setMatched(true)
    // eslint-disable-next-line
  }, [location])

  console.log(routes)

  return matched
}

export default useMatchedRoute
