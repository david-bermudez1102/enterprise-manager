import React from "react"
import { Switch, useRouteMatch } from "react-router-dom"
import RecordFieldDelete from "../../components/Records/RecordFieldDelete"
import { removeRecordField } from "../../actions/recordFieldActions"
import Route from "../../Router/Route"
import { useDispatch } from "react-redux"
import Records from "../../components/Records"

const RecordsContainer = props => {
  const { resource } = props
  const match = useRouteMatch()
  const dispatch = useDispatch()

  return (
    <Switch>
      <Route
        path={`${match.path}/record_fields/:recordFieldId/delete`}
        render={props => (
          <RecordFieldDelete
            {...props}
            redirectTo={`${match.url}/records`}
            organizationId={resource.organizationId}
            resourceId={resource.id}
            removeRecordField={() => dispatch(removeRecordField)}
          />
        )}
      />
      <Route path={match.path} name={"Records"}>
        <Records resource={resource} />
      </Route>
    </Switch>
  )
}

export default React.memo(RecordsContainer)
