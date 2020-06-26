import { combineReducers } from "redux"
import { organizationsReducer } from "./organizationsReducer"
import { resourcesReducer } from "./resourcesReducer"
import { fieldsReducer } from "./fieldsReducer"
import {
  recordsReducer,
  recordsSortedBy,
  sortedRecords
} from "./recordsReducer"
import { valuesReducer, archivedValues } from "./valuesReducer"
import { sessionReducer } from "./sessionReducer"
import { recordFieldsReducer } from "./recordFieldsReducer"
import { accountsReducer } from "./accountsReducer"
import { zohoBooksReducer } from "./zohoBooksReducer"
import { alerts } from "./alertsReducer"
import { token } from "./tokenReducer"
import { pagination } from "./paginationReducer"
import { routes } from "./routesReducer"
import { sidebar } from "./sidebarReducer"
import {
  archivedRecords,
  sortedArchivedRecords,
  archivedRecordsSortedBy
} from "./archivedRecordsReducer"
import { statistics } from "./statisticsReducer"
import { theme } from "./themeReducer"
import { roles } from "./rolesReducer"
import { roots } from "./rootUsersReducer"
import { pagePermissions } from "./pagePermissionsReducer"
import { conversations } from "./conversationsReducer"

const requesting = (state = false, action) => {
  switch (action.type) {
    case "REQUESTING_DATA":
      return true
    case "FINISHED_REQUESTING":
      return false
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  session: sessionReducer,
  accounts: accountsReducer,
  organizations: organizationsReducer,
  roots,
  resources: resourcesReducer,
  fields: fieldsReducer,
  records: recordsReducer,
  sortedRecords,
  recordFields: recordFieldsReducer,
  recordsSortedBy,
  values: valuesReducer,
  zohoBooks: zohoBooksReducer,
  requesting,
  alerts,
  token,
  pagination,
  routes,
  sidebar,
  archivedRecords,
  archivedValues,
  sortedArchivedRecords,
  archivedRecordsSortedBy,
  statistics,
  theme,
  roles,
  pagePermissions,
  conversations
})
