import { combineReducers } from "redux";
import { organizationReducer } from "./organizationReducer";
import { adminsReducer } from "./adminsReducer";

export const rootReducer = combineReducers({organizations:organizationReducer,admins:adminsReducer})