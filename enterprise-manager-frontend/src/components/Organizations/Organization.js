import React from "react"
import { useRouteMatch } from "react-router-dom"
import { useSelector, shallowEqual } from "react-redux"

const Organization = () => {
  const match = useRouteMatch()
  const { organizationId } = match.params
  const { organizations } = useSelector(
    ({ organizations }) => ({ organizations }),
    shallowEqual
  )
  const organization = organizations.find(
    o => parseInt(o.id) === parseInt(organizationId)
  )
  return organization && <>{organization.name}</>
}

export default Organization
