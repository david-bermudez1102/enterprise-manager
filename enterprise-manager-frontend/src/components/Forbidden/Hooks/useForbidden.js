import { useState, useEffect } from "react"
import useLinks from "../../../Router/Hooks/useLinks"
import { useLocation } from "react-router-dom"
import { useSelector, shallowEqual } from "react-redux"

const useForbidden = ({ organization }) => {
  const { links } = useLinks({ organization })
  const location = useLocation()
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const { currentUser } = session

  const [isForbidden, setIsForbidden] = useState(false)

  useEffect(() => {
    if (session.isLoggedIn) {
      const currentLink = links.find(link => link.path === location.pathname)
      const currentsubLinks = links.find(
        link =>
          link.subLinks &&
          link.subLinks.some(subLink => subLink.path === location.pathname)
      )

      if (currentLink && !currentLink.everyone && !currentUser.isRoot) {
        setIsForbidden(!currentLink.levels.some(l => l.readPrivilege))
      } else if (currentsubLinks && !currentUser.isRoot) {
        setIsForbidden(
          !currentsubLinks.subLinks.some(subLink =>
            currentsubLinks.levels.some(l => l[subLink.required])
          )
        )
      } else {
        setIsForbidden(false)
      }
    }
  }, [location, links, currentUser, session])

  return isForbidden
}
export default useForbidden
