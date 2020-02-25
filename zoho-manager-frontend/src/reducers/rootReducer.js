import { combineReducers } from "redux";
import { organizationReducer } from "./organizationReducer";
import { adminsReducer } from "./adminsReducer";
import { resourcesReducer } from "./resourcesReducer";

export const rootReducer = combineReducers({
  organizations: organizationReducer,
  admins: adminsReducer,
  resources: resourcesReducer
});
