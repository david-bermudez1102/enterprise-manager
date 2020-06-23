import React, { useEffect } from "react"
import { useRouteMatch } from "react-router-dom"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { fetchPagePermissions } from "../../../actions/pagePermissionsActions"
import cable from "../socket"

const OrganizationWebSocket = props => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const match = useRouteMatch()
  const dispatch = useDispatch()

  const organizationId =
    match.params.organizationId || session.currentUser.organizationId

  useEffect(() => {
    dispatch(fetchPagePermissions(organizationId))
    cable.subscriptions.create(
      {
        channel: "OrganizationChannel",
        organization_id: organizationId
      },
      {
        received: updatedOrganization => {
          dispatch({
            type: "SET_PAGE_PERMISSIONS",
            pagePermissions: updatedOrganization.pagePermissions
          })
        }
      }
    )
  }, [])
  return <></>
}

export default OrganizationWebSocket
