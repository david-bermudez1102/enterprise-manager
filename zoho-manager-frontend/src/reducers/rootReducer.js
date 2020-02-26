import { combineReducers } from "redux";
import { organizationReducer } from "./organizationReducer";
import { adminsReducer } from "./adminsReducer";
import { resourcesReducer } from "./resourcesReducer";
import { fieldsReducer } from "./fieldsReducer";
import { recordsReducer } from "./recordsReducer";

export const rootReducer = combineReducers({
  organizations: organizationReducer,
  admins: adminsReducer,
  resources: resourcesReducer,
  fields: fieldsReducer,
  records: recordsReducer
});
