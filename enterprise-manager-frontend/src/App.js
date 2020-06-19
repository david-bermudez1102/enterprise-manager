import React, { useState, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { fetchOrganizations } from "./actions/organizationAction"
import { fetchSession } from "./actions/sessionActions"
import HomeContainer from "./containers/Home/HomeContainer"
import Route from "./Router/Route"
import "./App.scss"
import { fetchRoots } from "./actions/rootActions"

const App = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const { organizations } = useSelector(
    ({ organizations }) => ({ organizations }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(fetchOrganizations()).then(organizations => {
      if (organizations.length) {
        dispatch(fetchRoots(4)).then(() =>
          dispatch(fetchSession()).then(() => setLoaded(true))
        )
      } else setLoaded(true)
    })
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      {loaded ? (
        <Route path='/' name={"Home"}>
          <HomeContainer organization={organizations[0]} />
        </Route>
      ) : null}
    </Router>
  )
}

export default App
