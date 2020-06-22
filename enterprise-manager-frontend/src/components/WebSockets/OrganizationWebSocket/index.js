import React, { useEffect } from "react"
import { useRouteMatch } from "react-router-dom"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import actioncable from "actioncable"
import { fetchPagePermissions } from "../../../actions/pagePermissionsActions"

const OrganizationWebSocket = props => {
  const cable = actioncable.createConsumer("ws://localhost:3001/cable")
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
