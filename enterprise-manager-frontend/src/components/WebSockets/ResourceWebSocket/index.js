import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import cable from "../socket"
import { fetchValues } from "../../../actions/valueActions"
import { useRouteMatch } from "react-router-dom"

const ResourceWebSocket = ({ resourceId }) => {
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const { organizationId } = match.params

  useEffect(() => {
    if (organizationId && resourceId) {
      console.log(organizationId, resourceId)
      dispatch(fetchValues(parseInt(organizationId), resourceId))
      cable.subscriptions.create(
        {
          channel: "FormChannel",
          organization_id: organizationId,
          form_id: resourceId
        },
        {
          received: data => {
            dispatch({
              type: "SET_MAPPED_VALUES",
              values: data.values
            })
          }
        }
      )
    }
    // eslint-disable-next-line
  }, [organizationId, resourceId])
  return <></>
}

export default ResourceWebSocket
