import React, { useState, useEffect } from "react"
import { Redirect, useRouteMatch } from "react-router-dom"
import { useDispatch } from "react-redux"
import { removeField } from "../../actions/fieldActions"

const FieldDelete = ({ fields, redirectTo }) => {
  const dispatch = useDispatch()
  const match = useRouteMatch()

  const [deleted, setDeleted] = useState(false)
  const field = fields.find(f => f.id === parseInt(match.params.fieldId))
  useEffect(() => {
    dispatch(
      removeField({ organizationId: match.params.organizationId, ...field })
    ).then(action => setDeleted(action ? true : false))
  }, [])

  return deleted && <Redirect to={redirectTo} />
}

export default FieldDelete
