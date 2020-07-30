import React, { useState, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { fetchOrganizations } from "./actions/organizationAction"
import { fetchSession } from "./actions/sessionActions"
import HomeContainer from "./containers/Home/HomeContainer"
import Route from "./Router/Route"
import "./App.scss"
import { fetchRoots } from "./actions/rootActions"
import SessionWebSocket from "./components/WebSockets/SessionWebSocket"
import { DndProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

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
          <SessionWebSocket />
          <DndProvider backend={HTML5Backend}>
            <HomeContainer organization={organizations[0] || {}} />
          </DndProvider>
        </Route>
      ) : null}
    </Router>
  )
}

export default App
