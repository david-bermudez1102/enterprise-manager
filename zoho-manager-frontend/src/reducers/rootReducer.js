import { combineReducers } from "redux";
import { organizationReducer } from "./organizationReducer";
import { adminsReducer } from "./adminsReducer";
import { resourcesReducer } from "./resourcesReducer";
import { fieldsReducer } from "./fieldsReducer";
import { recordsReducer } from "./recordsReducer";
import { valuesReducer } from "./valuesReducer";
import { sessionReducer } from "./sessionReducer";

export const rootReducer = combineReducers({
  session: sessionReducer,
  organizations: organizationReducer,
  admins: adminsReducer,
  resources: resourcesReducer,
  fields: fieldsReducer,
  records: recordsReducer,
  recordFields: recordFieldsReducer,
  values: valuesReducer
});
