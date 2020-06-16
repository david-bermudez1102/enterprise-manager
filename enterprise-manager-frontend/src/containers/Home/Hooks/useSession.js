import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { fetchSession } from "../../../actions/sessionActions"
import { useEffect, useRef } from "react"
import { message } from "antd"

const useSession = () => {
  const routes = ["/", "/login", "/reset_password", "/accounts/new"]
  const { session, organizations, roots } = useSelector(
    ({ session, organizations, roots }) => ({ session, organizations, roots }),
    shallowEqual
  )
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const mounted = useRef()

  useEffect(() => {
    dispatch(fetchSession())
  }, [dispatch, location])

  useEffect(() => {
    if (location.state)
      if (location.state.loginFailed) {
        message.error("You need to login to view the page requested.")
      }
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      if (
        !session.isLoggedIn &&
        organizations.length &&
        roots.length &&
        !routes.includes(location.pathname)
      ) {
        history.push("/login", { loginFailed: true })
      }
    }
  }, [dispatch, session, routes, roots, location, history, organizations])

  return session
}

export default useSession
