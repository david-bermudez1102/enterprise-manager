import React, { useState, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchOrganizations } from "./actions/organizationAction"
import { fetchSession } from "./actions/sessionActions"
import HomeContainer from "./containers/Home/HomeContainer"
import { fetchAdmins } from "./actions/adminActions"
import Route from "./Router/Route"
import "./App.scss"

const App = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    dispatch(fetchOrganizations()).then(() => {
      dispatch(fetchAdmins()).then(() =>
        dispatch(fetchSession()).then(() => setLoaded(true))
      )
    })
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      {loaded ? (
        <Route path='/' name={"Home"} component={HomeContainer} />
      ) : null}
    </Router>
  )
}

export default App
